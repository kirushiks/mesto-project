
const popupEdit = document.querySelector("#popup_edit");
const popupToggleEdit = document.querySelector(".profile__edit-button");
const popupCloseEdit = document.querySelector("#popup__edit_close");

const popupAdd = document.querySelector("#popup_newplace");
const popupToggleAdd = document.querySelector(".profile__add-button");
const popupCloseAdd = document.querySelector("#popup__newplace_close");

const popupPhoto = document.querySelector("#popup_photo");
const popupPhotoClose = document.querySelector("#popup__photo_close");

const formElement = document.querySelector("#popup_edit .popup__form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");

const nameInput = document.querySelector("#popup__field_value_name");
const jobInput = document.querySelector("#popup__field_value_info");

const elements = document.querySelector(".elements");

const newPlaceForm = document.querySelector("#popup_newplace .popup__form");
const newPlaceNameInput = document.querySelector("#popup_newpPlaceName");
const newPlaceImgInput = document.querySelector("#popup_newpPlaceImg");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

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

const openPopup = (element) => element.classList.add("active");

const closePopup = (element) => element.classList.remove("active");

popupToggleEdit.addEventListener("click", () => {
  document.querySelector("#popup__field_value_name").value =
    profileName.innerHTML;
  document.querySelector("#popup__field_value_info").value =
    profileJob.innerHTML;
  openPopup(popupEdit);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(popup));
});

popupToggleAdd.addEventListener("click", () => openPopup(popupAdd));

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

const createCard = (placeName, picURL) => {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  imageElement.addEventListener("click", () => {
    popupPhoto.querySelector(".popup__image").src = picURL;
    popupPhoto.querySelector(".popup__card_title").innerHTML = placeName;
    openPopup(popupPhoto);
  });

  imageElement.src = picURL;

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

const handleSubmitForm = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

formElement.addEventListener("submit", handleSubmitForm);

const handleNewPlaceForm = (evt) => {
  evt.preventDefault();

  const card = createCard(newPlaceNameInput.value, newPlaceImgInput.value);
  elements.prepend(card);
  newPlaceNameInput.value = "";
  newPlaceImgInput.value = "";
  closePopup(popupAdd);
};

newPlaceForm.addEventListener("submit", handleNewPlaceForm);

initialCards.forEach(({ name, link }) => {
  elements.prepend(createCard(name, link));
});

