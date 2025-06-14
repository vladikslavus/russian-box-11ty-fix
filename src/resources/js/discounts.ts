import type { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

const NAV_SWIPER_SELECTOR = '.navSwiper';

export function initNavSwiper(element: HTMLElement = document.body, options?: SwiperOptions) {
  // Инициализация модулей
  Swiper.use([Autoplay]);

  // Находим контейнер слайдера
  const swiperElement = element.querySelector<HTMLElement>(NAV_SWIPER_SELECTOR);
  if (!swiperElement)
    return null;

  // Базовые настройки
  const defaultOptions: SwiperOptions = {
    slidesPerView: 'auto',
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        spaceBetween: 20,
        slidesPerView: 1.3,
      },
      576: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3.3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    ...options, // Позволяет переопределить настройки
  };

  // Создаем и возвращаем экземпляр Swiper
  return new Swiper(swiperElement, defaultOptions);
}

// Пример использования:
// const navSwiper = initNavSwiper();
// if (navSwiper) navSwiper.update();
