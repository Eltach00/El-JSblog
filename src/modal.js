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
        
        if(this.content) {
            vmodal.innerHTML = this.contentTemplate()
        } else {
        vmodal.innerHTML = `<div class="vmodal">
        <div class="modal-overlay" data-close='true'>
        <div class="modal-window">
          <div class="modal-header">
            <span class="mui--text-headline">${this.title || 'No title'}</span>
            <span class="modal-close" data-close="true">&times;</span>
          </div>
          <div class="mui--text-headline">
            <form class="mui-form" id='auth-form'>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="pass" required>
            <label for="pass">Password</label>
        </div>
        <div class="modal-footer">
          <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" id="submit-auth">Submit</button>
          <button data-close='true' class="mui-btn mui-btn--raised mui-btn--danger">Cancel</button>
          </div>
        </form>
          </div>
          </div></div></div>
          `;
        }
          
     this.element = vmodal.firstElementChild;
    }

    contentTemplate() {
        return `<div class="vmodal">
        <div class="modal-overlay" data-close='true'>
        <div class="modal-window">
          <div class="modal-header">
            <span class="mui--text-headline">${this.title || 'No title'}</span>
            <span class="modal-close" data-close="true">&times;</span>
          </div>
          <div class="mui--text-headline">
            ${this.content}
        <div class="modal-footer">
        <button data-close='true' class="mui-btn mui-btn--raised mui-btn--danger">Cancel</button>
        </div>
          </div>
          </div></div></div>`
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
        if (!this.element) { 
            this.render() 
        }
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