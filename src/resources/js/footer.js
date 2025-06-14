import { getScrollbarWidth } from '@/js/vendor/getscrollbarwidth';
import { MagicModals } from '@/js/vendor/magicmodals'; // custom scroll
import 'simplebar';
import 'simplebar/dist/simplebar.css';

const scrollbarWidth = getScrollbarWidth();

new MagicModals({
  container: '.modal-window',
  openBtn: '.modal-btn',
  closeBtn: '.modal-window__close',
  scrollbarWidth,
  speed: 300,
  // smartNavbarInstance: smartNavbar
}).launch();
