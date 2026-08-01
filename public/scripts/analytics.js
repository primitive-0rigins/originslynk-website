const analyticsWindow = window;

const track = (event, details = {}) => {
  const payload = { event, ...details };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('originslynk:analytics', { detail: payload }));
};

analyticsWindow.originslynkTrack = track;

document.addEventListener('click', (clickEvent) => {
  const link = clickEvent.target.closest?.('a');
  if (!link) return;

  const explicitEvent = link.dataset.analyticsEvent;
  if (explicitEvent) {
    const details = Object.fromEntries(
      Object.entries(link.dataset)
        .filter(([key]) => key !== 'analyticsEvent')
        .map(([key, value]) => [key, value || ''])
    );
    track(explicitEvent, details);
    return;
  }

  if (new URL(link.href, window.location.href).pathname === '/contact') {
    track('consultation_click', { location: window.location.pathname });
  }
});
