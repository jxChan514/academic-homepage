const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menu.focus();
  }
});
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];
let scheduled = false;
function updateNavigation() {
  const active = sections.filter(section => section.getBoundingClientRect().top <= 160).at(-1) || sections[0];
  for (const link of links) {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
