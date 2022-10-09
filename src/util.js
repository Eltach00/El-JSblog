export function isValid(value) {
    return value.length >= 10
}

export class Modal {

    TIMER = 200;
    element;
    isdestroyed = false;

    constructor({ title = '', content = ''} = {}) {
        this.title = title;
        this.content = content;
    }

    render() {
        const vmodal = document.createElement('div');
        vmodal.innerHTML = `<div class="vmodal">
        <div class="modal-overlay" data-close='true'>
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-title">${this.title || 'No title'}</span>
            <span class="modal-close" data-close="true">&times;</span>
          </div>
          <div class="modal-body">
            ${this.content || 'No context'}
          </div>
          <div class="modal-footer">
          <button data-close='true' class="mui-btn mui-btn--raised mui-btn--danger">Cancel</button>
          </div></div></div></div>`;
          
     this.element = vmodal.firstElementChild;
    }

    addEvents() {
        this.closeListener = event => {
            if(event.target.dataset.close) this.close()
        }
        document.addEventListener('click', this.closeListener)
    }

    open() {
        if (this.isdestroyed) { 
            alert('Modal is destroyed')
        } else {
        if (!this.element) this.render()
        setTimeout(() => {
        this.element.classList.add('open');
        }, 10);
        document.body.append(this.element);
        this.addEvents()
        }
        
    }

    close = () => {
        this.element.classList.remove('open');
        this.element.classList.add('hide')
        setTimeout(() => {
            this.element.classList.remove('hide')
            this.element.remove()
        }, this.TIMER);
        document.removeEventListener('click', this.closeListener)
    }

    destroy(){
        if (this.element) { 
            this.element.remove()
            document.removeEventListener('click', this.closeListener)
            this.isdestroyed = true;
        }
    }

}