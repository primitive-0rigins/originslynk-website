const form = document.querySelector('[data-consultation-form]');
const status = document.querySelector('#form-status');
const preparedEmail = document.querySelector('#prepared-email');
const service = document.querySelector('#service');
const requestedService = new URLSearchParams(window.location.search).get('service');

if (service && requestedService && Array.from(service.options).some((option) => option.value === requestedService)) {
  service.value = requestedService;
}

let formStarted = false;
let formCompleted = false;

form?.addEventListener('focusin', () => {
  if (formStarted) return;
  formStarted = true;
  window.originslynkTrack?.('form_start', { form: 'consultation' });
});

const prepareEmail = () => {
  if (!form || !preparedEmail) return false;

  const values = new FormData(form);
  const labels = {
    name: 'Name',
    email: 'Work email',
    phone: 'Phone',
    organization: 'Business name',
    role: 'Role',
    industry: 'Industry',
    problem: 'Main repetitive task or workflow',
    tools: 'Current software or accounts involved',
    hours: 'Approximate hours per week',
    sensitivity: 'Sensitive or regulated information category',
    timeline: 'Preferred consultation time',
    service: 'Service considered',
  };
  const lines = Object.entries(labels)
    .map(([name, label]) => [label, String(values.get(name) || '').trim()])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}:\n${value}`);
  const organization = String(values.get('organization') || '').trim();
  const subject = `Workflow review request${organization ? ` — ${organization}` : ''}`;
  const contactEmail = form.dataset.contactEmail || 'bryce@originslynk.com';

  preparedEmail.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n\n'))}`;
  preparedEmail.hidden = false;
  return true;
};

preparedEmail?.addEventListener('click', () => {
  formCompleted = true;
  window.originslynkTrack?.('form_handoff', { form: 'consultation', method: 'prepared_email' });
});

form?.addEventListener('submit', async (submitEvent) => {
  submitEvent.preventDefault();
  if (!status) return;

  const trap = form.querySelector('[name="company_website"]');
  if (trap?.value) {
    formCompleted = true;
    form.reset();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  if (preparedEmail) preparedEmail.hidden = true;
  status.hidden = false;
  status.classList.remove('is-error', 'is-success');

  if (form.dataset.formMode === 'email') {
    prepareEmail();
    status.classList.add('is-success');
    status.textContent = 'Your request is ready. Open the addressed email below, review it, and press send to complete your request.';
    window.originslynkTrack?.('form_prepared', { form: 'consultation' });
    if (submitButton) submitButton.disabled = false;
    preparedEmail?.focus();
    return;
  }

  status.textContent = 'Sending your request…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);

    status.classList.add('is-success');
    status.textContent = 'Thank you. Your workflow review request was sent. We will reply within one business day.';
    formCompleted = true;
    window.originslynkTrack?.('form_submission', { form: 'consultation', method: 'endpoint' });
    form.reset();
  } catch {
    prepareEmail();
    status.classList.add('is-error');
    status.textContent = 'The direct form could not send. Your answers are still here—use the prepared email below instead.';
    preparedEmail?.focus();
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

window.addEventListener('pagehide', () => {
  if (formStarted && !formCompleted) {
    window.originslynkTrack?.('form_abandonment', { form: 'consultation' });
  }
});
