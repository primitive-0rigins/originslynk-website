const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');

if (toggle && navigation) {
  toggle.classList.add('is-ready');
  if (window.matchMedia('(max-width: 56rem)').matches) navigation.hidden = true;

  toggle.addEventListener('click', () => {
    const opening = navigation.hidden;
    navigation.hidden = !opening;
    toggle.setAttribute('aria-expanded', String(opening));
  });

  window.matchMedia('(min-width: 56.01rem)').addEventListener('change', (event) => {
    navigation.hidden = !event.matches;
    toggle.setAttribute('aria-expanded', 'false');
  });
}
