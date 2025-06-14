const nav = document.querySelector<HTMLElement>('.topbar__rights');
const overlay = document.querySelector<HTMLElement>('.page__overlay');

const menuBtn = document.querySelector<HTMLElement>('.topbar__hamburger-wrapper');
const menuHamburger = document.querySelector<HTMLElement>('.topbar__hamburger');
const html = document.querySelector<HTMLElement>('html');

// Проверка на null (TypeScript требует проверки)
if (!menuBtn || !menuHamburger || !nav || !overlay || !html) {
  throw new Error('One or more elements not found');
}

// de\activate the menu
menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log('Yo!!!!!!!!!!!!!!!!!!!');
  menuBtn.classList.toggle('topbar__hamburger-wrapper_activate');
  menuHamburger.classList.toggle('topbar__hamburger_animate');
  nav.classList.toggle('topbar__rights_active');
  overlay.classList.toggle('page__overlay_active');
  document.body.classList.toggle('no-scroll');
  html.classList.toggle('no-scroll');
});
