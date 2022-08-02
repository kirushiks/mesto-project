import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.card = document.querySelector('.popup__foto');
        this.cardTitle = document.querySelector('.popup__place-name')

    }
    open(data) {
        this.cardTitle.textContent = data.name; 
        this.card.src = data.link;
        this.cardTitle.alt = data.name;
            
        super.open();
    }; 
}