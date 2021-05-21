export default class Modal {
    constructor(selectorIDModal){
      this.modal = document.querySelector(selectorIDModal);
      this.overlay = document.querySelector('.overlay-modal');
    }

    events(){
      // buttonClose
      const buttonClose = this.modal.querySelector(`.modal__close`);
      const overlay = document.querySelector(`.overlay-modal`);
        buttonClose && buttonClose.addEventListener('click', (e)=>{
          this.closeModal();
        }); 
      // overlayClose
        overlay && overlay.addEventListener('click', (e)=>{
          this.closeModal();
        });
    }

    openModal(){
      if (this.modal) {
        this.modal.classList.add('active');
        this.overlay && this.overlay.classList.add('active');
      }
    }
    closeModal(){
      if (this.modal) {
            this.modal.classList.remove('active');
            this.overlay && this.overlay.classList.remove('active');
      }
    }

    render(contentHTML = ''){
    let html = `<div class="modal__header">
                    <div class="modal__close">X</div>
                </div>
                <div class="modal__content">
                  ${contentHTML}
                </div>`;
    this.modal.classList.add('modal');
    this.modal.innerHTML = html;
    this.events();
    }
  }