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

function environment(send = async () => undefined) {
  return {
    CONTACT_EMAIL: 'owner@example.com',
    SEND_EMAIL: { send },
  };
}

const validFields = {
  name: 'Test Person',
  email: 'person@example.com',
  organization: 'Test Company',
  role: 'Marketing director',
  problem: 'Preparing the same weekly report.',
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

test('silently accepts the honeypot without sending', async () => {
  let sends = 0;
  const result = await worker.fetch(
    request({ ...validFields, company_website: 'https://spam.example' }),
    environment(async () => { sends += 1; }),
  );

  assert.equal(result.status, 200);
  assert.equal(sends, 0);
});

test('sends a constrained plain-text message', async () => {
  const messages = [];
  const result = await worker.fetch(
    request({ ...validFields, tools: 'Email and spreadsheets', phone: '555-0100' }),
    environment(async (message) => { messages.push(message); }),
  );

  assert.equal(result.status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].from, 'website@originslynk.com');
  assert.equal(messages[0].to, 'owner@example.com');
  assert.equal(messages[0].replyTo, 'person@example.com');
  assert.match(messages[0].subject, /Test Company/);
  assert.match(messages[0].text, /What repeats most:\nPreparing the same weekly report\./);
  assert.doesNotMatch(messages[0].text, /consent|company_website/i);
});

test('returns a recoverable error when email delivery fails', async () => {
  const result = await worker.fetch(
    request(validFields),
    environment(async () => { throw new Error('delivery unavailable'); }),
  );

  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), { ok: false, error: 'Email delivery failed.' });
});
