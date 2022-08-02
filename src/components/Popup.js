export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
     };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup__container') || 
      evt.target.classList.contains('popup__exit')) { 
        this.close();
      };
    })
  }

  renderLoading (isLoading) {
    if(isLoading) {
      this._submitButton = this._popup.querySelector('.popup__button');
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}