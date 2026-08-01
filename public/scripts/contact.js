const form = document.querySelector('[data-consultation-form]');
const status = document.querySelector('#form-status');
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

form?.addEventListener('submit', async (submitEvent) => {
  submitEvent.preventDefault();
  if (!status) return;

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  status.hidden = false;
  status.classList.remove('is-error', 'is-success');
  status.textContent = 'Sending your request…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);

    status.classList.add('is-success');
    status.textContent = 'Thank you. Your workflow review request was sent successfully. We will reply within one business day.';
    formCompleted = true;
    window.originslynkTrack?.('form_submission', { form: 'consultation' });
    form.reset();
  } catch {
    status.classList.add('is-error');
    status.textContent = 'We could not send the form. Please use the direct email link below instead.';
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

window.addEventListener('pagehide', () => {
  if (formStarted && !formCompleted) {
    window.originslynkTrack?.('form_abandonment', { form: 'consultation' });
  }
});
