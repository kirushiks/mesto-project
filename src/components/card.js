import { changeLikeStatus, closePopup, openPopup } from "./utils.js";

import { PhotoModal } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const elements = document.querySelector(".elements");
const defaultAltText = "Изображение на карточке";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

export const createCard = (placeName, picURL) => {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  imageElement.addEventListener("click", () => {
    PhotoModal.img.src = picURL;
    PhotoModal.img.alt = placeName || defaultAltText;
    PhotoModal.title.textContent = placeName;
    openPopup(PhotoModal.popup);
  });

  imageElement.src = picURL;
  imageElement.alt = placeName || defaultAltText;

  cardElement.querySelector(".element__title").textContent = placeName;

  cardElement
    .querySelector(".element__like")
    .addEventListener("click", changeLikeStatus);

  cardElement
    .querySelector(".element__image_trash")
    .addEventListener("click", (e) => {
      elements.removeChild(cardElement);
    });

  return cardElement;
};

export const initialiseCards = () =>
  initialCards.forEach(({ name, link }) => {
    elements.prepend(createCard(name, link));
  });
