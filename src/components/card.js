import * as api from "./api.js";

import { PhotoModal, openPopup } from "./modal.js";

import { state } from "./state";

const changeLikeStatus = (evt, likeCounter, cardId) => {
  const elementLike = evt.currentTarget;
  if (elementLike.classList.contains("element__like")) {
    api
      .putLike(cardId)
      .then(({ likes }) => {
        elementLike.classList.remove("element__like");
        elementLike.classList.add("element__like_active");
        likeCounter.textContent = likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .deleteLike(cardId)
      .then(({ likes }) => {
        elementLike.classList.add("element__like");
        elementLike.classList.remove("element__like_active");
        likeCounter.textContent = likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const elements = document.querySelector(".elements");
const defaultAltText = "Изображение на карточке";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

const deleteCard = async (cardId) => {
  return await api.deleteCard(cardId);
};

export const buildCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  const likeCounter = cardElement.querySelector(".element__like_count");
  const elementLike = cardElement.querySelector(".element__like");
  imageElement.addEventListener("click", () => {
    PhotoModal.img.src = cardData.link;
    PhotoModal.img.alt = cardData.name || defaultAltText;
    PhotoModal.title.textContent = cardData.name;
    openPopup(PhotoModal.popup);
  });

  likeCounter.textContent = cardData.likes.length;

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name || defaultAltText;

  cardElement.querySelector(".element__title").textContent = cardData.name;

  // config like status
  if (cardData.likes.some((like) => like._id == state.ownerId)) {
    elementLike.classList.remove("element__like");
    elementLike.classList.add("element__like_active");
  } else {
    elementLike.classList.add("element__like");
    elementLike.classList.remove("element__like_active");
  }
  elementLike.addEventListener("click", (evt) =>
    changeLikeStatus(evt, likeCounter, cardData._id)
  );
  // config delete owned card
  if (state.ownerId == cardData.owner._id) {
    cardElement
      .querySelector(".element__image_trash")
      .addEventListener("click", async (evt) => {
        await deleteCard(cardData._id)
          .then(() => {
            elements.removeChild(cardElement);
          })
          .catch((error) =>
            console.log(`${error} \n Unlucky deleting card ${cardData.name}`)
          );
      });
  } else {
    cardElement.removeChild(cardElement.querySelector(".element__image_trash"));
  }

  return cardElement;
};

export const createCard = async (name, link) => {
  return await api.addCard(name, link);
};

export const initialCards = async (settings) => {
  await api
    .getCards()
    .then((cards) =>
      cards.forEach((card) => {
        elements.prepend(buildCard(card));
      })
    )
    .catch(console.log);
};
