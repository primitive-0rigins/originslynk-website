const allowedOrigins = new Set([
  'https://originslynk.com',
  'https://www.originslynk.com',
]);

const maxRequestBytes = 15_000;

const fields = [
  ['name', 'Name', 100],
  ['email', 'Work email', 160],
  ['organization', 'Business name', 140],
  ['challenge', 'Closest situation', 120],
  ['problem', 'What happens now', 1200],
  ['desired_outcome', 'What should happen instead', 700],
  ['service', 'Requested service', 100],
  ['sensitivity', 'Information involved', 100],
];

function response(body, status, origin = '', extraHeaders = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
    Vary: 'Origin',
    ...extraHeaders,
  };

  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Accept, Content-Type';
  }

  return new Response(JSON.stringify(body), { status, headers });
}

function clean(form, name, limit) {
  return String(form.get(name) || '').trim().slice(0, limit);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readBody(request) {
  const declaredLength = request.headers.get('Content-Length');
  if (declaredLength !== null && Number(declaredLength) > maxRequestBytes) return null;

  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    length += value.byteLength;
    if (length > maxRequestBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      return response({ ok: true, service: 'originslynk-contact' }, 200);
    }

    const origin = request.headers.get('Origin') || '';
    if (!allowedOrigins.has(origin)) {
      return response({ ok: false, error: 'Forbidden' }, 403);
    }

    if (request.method === 'OPTIONS') {
      return response({ ok: true }, 200, origin);
    }

    if (request.method !== 'POST') {
      return response({ ok: false, error: 'Method not allowed' }, 405, origin);
    }

    if (env.CONTACT_RATE_LIMITER) {
      const rateKey = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: rateKey });
      if (!success) {
        return response(
          { ok: false, error: 'Too many requests. Please try again in a minute.' },
          429,
          origin,
          { 'Retry-After': '60' },
        );
      }
    }

    const body = await readBody(request);
    if (body === null) {
      return response({ ok: false, error: 'Request too large' }, 413, origin);
    }

    let form;
    try {
      form = await new Response(body, {
        headers: { 'Content-Type': request.headers.get('Content-Type') || '' },
      }).formData();
    } catch {
      return response({ ok: false, error: 'Invalid form data' }, 400, origin);
    }

    if (String(form.get('company_website') || '').trim()) {
      return response({ ok: true }, 200, origin);
    }

    const values = Object.fromEntries(
      fields.map(([name, , limit]) => [name, clean(form, name, limit)]),
    );
    const consent = String(form.get('consent') || '');

    if (
      !values.name ||
      !validEmail(values.email) ||
      !values.organization ||
      !values.challenge ||
      !values.problem ||
      !values.desired_outcome ||
      !values.sensitivity ||
      consent !== 'yes'
    ) {
      return response(
        { ok: false, error: 'Please complete the required fields.' },
        400,
        origin,
      );
    }

    const message = fields
      .filter(([name]) => values[name])
      .map(([name, label]) => `${label}:\n${values[name]}`)
      .join('\n\n');
    const organization = values.organization.replace(/[\r\n]/g, ' ').slice(0, 80);
    const subject = organization
      ? `Service request - ${organization}`
      : 'Service request';

    try {
      await env.SEND_EMAIL.send({
        from: 'website@originslynk.com',
        to: env.CONTACT_EMAIL,
        replyTo: values.email,
        subject,
        text: message,
      });
    } catch {
      console.error('Contact email delivery failed');
      return response({ ok: false, error: 'Email delivery failed.' }, 502, origin);
    }

    return response({ ok: true }, 200, origin);
  },
};
