const search = document.querySelector('[data-faq-search]');
const items = Array.from(document.querySelectorAll('[data-faq-item]'));
const empty = document.querySelector('[data-faq-empty]');
const count = document.querySelector('#faq-result-count');
let tracked = false;

search?.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  items.forEach((item) => {
    const matches = !query || (item.dataset.search || '').includes(query);
    item.hidden = !matches;
    if (matches) visible += 1;
  });

  if (count) {
    count.textContent = query
      ? `${visible} ${visible === 1 ? 'answer' : 'answers'} found.`
      : `Showing all ${items.length} answers.`;
  }
  if (empty) empty.hidden = visible > 0;

  if (!tracked && query.length >= 2) {
    tracked = true;
    window.originslynkTrack?.('faq_search', { query_length: String(query.length) });
  }
});
