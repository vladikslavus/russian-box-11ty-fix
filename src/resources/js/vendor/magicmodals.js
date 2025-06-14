/****************************************************
*               Class magicModals                   *
*             Modal window generagor                *
*****************************************************/
class MagicModals {
  constructor(params) {
    // this.id = document.querySelector(params.id);
    this.container = (params.container === undefined) ? null : document.querySelectorAll(params.container);
    this.openBtn = (params.openBtn === undefined) ? null : document.querySelectorAll(params.openBtn);
    this.closeBtn = (params.closeBtn === undefined) ? null : document.querySelectorAll(params.closeBtn);
    this.scrollbarWidth = Number.parseInt(params.scrollbarWidth); // better use getscrollbarwidth.js to pass a value
    this.speed = (params.speed === undefined) ? 0 : Number.parseInt(params.speed); // ms

    this.smartNavbarInstance = params.smartNavbarInstance;
  }

  modalShow(id) {
    const modalWindowContainer = document.querySelector(`#${id}`);
    document.body.overflow = 'hidden';
    document.body.style.marginLeft = `-${this.scrollbarWidth}px !important`;
    // console.log(document.body.overflow, document.body.style.marginLeft);
    document.documentElement.style.overflow = 'hidden';
    modalWindowContainer.style.opacity = '1';
    modalWindowContainer.style.visibility = 'visible';
    modalWindowContainer.style.transition = `opacity ${this.speed}ms linear, visibility ${this.speed}ms linear`;
    // console.log('modalShow: ', modalWindowContainer.style.transition);
  }

  modalHide(id) {
    const modalWindowContainer = document.querySelector(`#${id}`);
    modalWindowContainer.style.opacity = '0';
    modalWindowContainer.style.visibility = 'hidden';
    modalWindowContainer.style.transition = `opacity ${this.speed}ms linear, visibility ${this.speed}ms linear`;
    // need to wait a bit for modalWindow to be shut
    setTimeout(() => {
      document.body.style.marginLeft = '0 !important';
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }, this.speed);
  }

  launch() {
    for (const el of this.openBtn) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const modalWindowId = el.dataset.modalId;
        if (this.smartNavbarInstance)
          this.smartNavbarInstance.navHide();
        this.modalShow.bind(this)(modalWindowId);
      });
    }

    for (const el of this.closeBtn) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const modalWindowId = el.dataset.modalId;
        this.modalHide.bind(this)(modalWindowId);
        // need to wait a bit for the browser scrollbar to be shown
        if (this.smartNavbarInstance)
          setTimeout(() => this.smartNavbarInstance.navShow(), 300);
      });
    }

    for (const el of this.container) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target === el && el.id) {
          this.modalHide.bind(this)(el.id);
          // need to wait a bit for the browser scrollbar to be shown
          if (this.smartNavbarInstance)
            setTimeout(() => this.smartNavbarInstance.navShow(), 300);
        }
      });
    }
  }
}

export { MagicModals };
