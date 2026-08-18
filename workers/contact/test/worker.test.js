import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../src/worker.js';

const origin = 'https://originslynk.com';

function request(fields = {}, requestOrigin = origin) {
  const form = new FormData();
  for (const [name, value] of Object.entries(fields)) form.set(name, value);

  return new Request('https://contact.example.test', {
    method: 'POST',
    headers: { Origin: requestOrigin },
    body: form,
  });
}

function rawRequest(body, headers = {}) {
  return new Request('https://contact.example.test', {
    method: 'POST',
    headers: {
      Origin: origin,
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    body,
  });
}

function environment(
  send = async () => undefined,
  limit = async () => ({ success: true }),
) {
  return {
    CONTACT_EMAIL: 'owner@example.com',
    CONTACT_RATE_LIMITER: { limit },
    SEND_EMAIL: { send },
  };
}

const validFields = {
  name: 'Test Person',
  email: 'person@example.com',
  organization: 'Test Company',
  challenge: 'Repetitive admin work',
  problem: 'Preparing the same weekly report.',
  desired_outcome: 'Start each Friday with a prepared report to review.',
  sensitivity: 'No sensitive or regulated information known',
  consent: 'yes',
};

test('serves a health response', async () => {
  const result = await worker.fetch(new Request('https://contact.example.test'), environment());
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { ok: true, service: 'originslynk-contact' });
});

test('rejects submissions from other origins', async () => {
  const result = await worker.fetch(request(validFields, 'https://example.com'), environment());
  assert.equal(result.status, 403);
});

test('rejects missing required fields without sending', async () => {
  let sends = 0;
  const result = await worker.fetch(
    request({ name: 'Test Person', consent: 'yes' }),
    environment(async () => { sends += 1; }),
  );

  assert.equal(result.status, 400);
  assert.equal(sends, 0);
});

test('requires every core intake field before sending', async () => {
  for (const field of ['organization', 'challenge', 'problem', 'desired_outcome', 'sensitivity']) {
    let sends = 0;
    const fields = { ...validFields };
    delete fields[field];
    const result = await worker.fetch(
      request(fields),
      environment(async () => { sends += 1; }),
    );

    assert.equal(result.status, 400, `${field} should be required`);
    assert.equal(sends, 0, `${field} should fail before sending`);
  }
});

test('silently accepts the honeypot without sending', async () => {
  let sends = 0;
  const result = await worker.fetch(
    request({ ...validFields, company_website: 'https://spam.example' }),
    environment(async () => { sends += 1; }),
  );

  assert.equal(result.status, 200);
  assert.equal(sends, 0);
});

test('rate limits invalid and honeypot submissions', async () => {
  let limits = 0;
  const env = environment(
    async () => assert.fail('should not send'),
    async () => {
      limits += 1;
      return { success: true };
    },
  );

  assert.equal((await worker.fetch(request({ name: 'Incomplete' }), env)).status, 400);
  assert.equal((await worker.fetch(request({ company_website: 'https://spam.example' }), env)).status, 200);
  assert.equal(limits, 2);
});

test('enforces the actual body size without trusting Content-Length', async () => {
  const oversized = new URLSearchParams({
    ...validFields,
    problem: 'x'.repeat(16_000),
  }).toString();

  for (const headers of [{}, { 'Content-Length': '100' }]) {
    let sends = 0;
    const result = await worker.fetch(
      rawRequest(oversized, headers),
      environment(async () => { sends += 1; }),
    );

    assert.equal(result.status, 413);
    assert.equal(sends, 0);
  }
});

test('sends a constrained plain-text message', async () => {
  const messages = [];
  const result = await worker.fetch(
    request(validFields),
    environment(async (message) => { messages.push(message); }),
  );

  assert.equal(result.status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].from, 'website@originslynk.com');
  assert.equal(messages[0].to, 'owner@example.com');
  assert.equal(messages[0].replyTo, 'person@example.com');
  assert.match(messages[0].subject, /Test Company/);
  assert.match(messages[0].text, /What happens now:\nPreparing the same weekly report\./);
  assert.match(messages[0].text, /Closest situation:\nRepetitive admin work/);
  assert.match(messages[0].text, /What should happen instead:\nStart each Friday/);
  assert.doesNotMatch(messages[0].text, /consent|company_website/i);
});

test('rate limits valid submissions before sending', async () => {
  let sends = 0;
  const result = await worker.fetch(
    request(validFields),
    environment(
      async () => { sends += 1; },
      async () => ({ success: false }),
    ),
  );

  assert.equal(result.status, 429);
  assert.equal(result.headers.get('Retry-After'), '60');
  assert.equal(sends, 0);
});

test('returns a recoverable error when email delivery fails', async () => {
  const result = await worker.fetch(
    request(validFields),
    environment(async () => { throw new Error('delivery unavailable'); }),
  );

  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), { ok: false, error: 'Email delivery failed.' });
});
