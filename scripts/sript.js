const popupEdit = document.querySelector("#popup_edit");
const popupToggleEdit = document.querySelector(".profile__edit-button");
const popupCloseEdit = document.querySelector("#popup__edit_close");

const popupAdd = document.querySelector("#popup_newplace");
const popupToggleAdd = document.querySelector(".profile__add-button");
const popupCloseAdd = document.querySelector("#popup__newplace_close");

const popupPhoto = document.querySelector("#popup_photo");
const popupPhotoClose = document.querySelector("#popup__photo_close");

const openPopup = (elem) => {
  elem.classList.add("active");
}

const closePopup = (elem) => {
  elem.classList.remove("active");
}

popupToggleEdit.addEventListener("click",  () => openPopup(popupEdit));

popupCloseEdit.addEventListener("click",  () => closePopup(popupEdit));

popupToggleAdd.addEventListener("click",  () => openPopup(popupAdd));

popupCloseAdd.addEventListener("click",  () => closePopup(popupAdd));

popupPhotoClose.addEventListener("click",  () => closePopup(popupPhoto));

const formElement = document.querySelector("#popup_edit .popup__form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");

const nameInput = document.querySelector("#popup__field_value_name");
const jobInput = document.querySelector("#popup__field_value_info");

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEdit.style.display = "none";
};

formElement.addEventListener("submit", formSubmitHandler);

const elements = document.querySelector(".elements");

const newplaceForm = document.querySelector("#popup_newplace .popup__form");
const newplaceNameInput = document.querySelector("#popup_newpPlaceName");
const newplaceImgInput = document.querySelector("#popup_newpPlaceImg");

const changeLikeStatus = (e) => {
  const elementLike = e.currentTarget;
  if (elementLike.classList.contains("element__like")) {
    elementLike.classList.remove("element__like");
    elementLike.classList.add("element__like_active");
  } else {
    elementLike.classList.add("element__like");
    elementLike.classList.remove("element__like_active");
  }
};

const addNewCard = (placeName, picURL) => {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement =  cardElement.querySelector(".element__image");
  imageElement.addEventListener("click", () => {
    popupPhoto.querySelector(".popup__image").src = picURL;
    popupPhoto.querySelector(".popup__card_title").innerHTML = placeName;
    openPopup(popupPhoto)
  });

  imageElement.src = picURL;

  cardElement.querySelector(".element__title").textContent = placeName;

  cardElement.querySelector(".element__like").addEventListener("click", changeLikeStatus);

  cardElement.querySelector(".element__image_trash").addEventListener("click", (e) => {
    elements.removeChild(cardElement);
  });;

  elements.prepend(cardElement);
};

const newPlaceFormHandler = (evt) => {
  evt.preventDefault();

  addNewCard(newplaceNameInput.value, newplaceImgInput.value);
  popupAdd.style.display = "none";
};

newplaceForm.addEventListener("submit", newPlaceFormHandler);

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

initialCards.forEach((card) => {
  addNewCard(card.name, card.link);
});
