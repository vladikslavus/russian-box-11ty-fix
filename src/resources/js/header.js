// const topbar = document.querySelector(".topbar");
// const topbarTop = document.querySelector(".topbar__top");
// const topbarTop = document.querySelector(".topbar__top");
const nav = document.querySelector('.topbar__rights');
// const consult = document.querySelector(".topbar__consult");
const overlay = document.querySelector('.page__overlay');
// const lgMediaQuery = window.matchMedia("(min-width: 992px)");

const menuBtn = document.querySelector('.topbar__hamburger-wrapper');
const menuHamburger = document.querySelector('.topbar__hamburger');
// const content = document.querySelector(".content");

// de\activate the menu
menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  menuBtn.classList.toggle('topbar__hamburger-wrapper_activate');
  menuHamburger.classList.toggle('animate');
  nav.classList.toggle('topbar__rights_active');
  overlay.classList.toggle('page__overlay_active');
  console.log('Yo!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // content.classList.toggle("content-active");
  document.body.classList.toggle('no-scroll');
  document.querySelector('html').classList.toggle('no-scroll');
});
