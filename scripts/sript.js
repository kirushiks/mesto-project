const popupEdit = document.querySelector("#popup_edit");
const popupToggleEdit = document.querySelector(".profile__edit-button");
const popupCloseEdit = document.querySelector("#popup__edit_close");

const popupAdd = document.querySelector("#popup_newplace");
const popupToggleAdd = document.querySelector(".profile__add-button");
const popupCloseAdd = document.querySelector("#popup__newplace_close");

const popupPhoto = document.querySelector("#popup_photo");
const popupPhotoClose = document.querySelector("#popup__photo_close");

popupToggleEdit.addEventListener("click", () => {
  popupEdit.classList.toggle("active");
});

popupCloseEdit.addEventListener("click", () => {
  popupEdit.classList.toggle("active");
});

popupToggleAdd.addEventListener("click", () => {
  popupAdd.classList.toggle("active");
});

popupCloseAdd.addEventListener("click", () => {
  popupAdd.classList.toggle("active");
});

popupPhotoClose.addEventListener("click", () => {
  popupPhoto.classList.toggle("active");
});

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

const unliked = (e) => {
  const elementInfo = e.currentTarget.parentElement;
  elementInfo.removeChild(e.currentTarget);
  const elementLike = document.createElement("div");
  elementLike.classList.add("element__like");
  elementInfo.append(elementLike);
};

const liking = (e) => {
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
  const element = document.createElement("div");
  element.classList.add("element");

  const image = document.createElement("img");
  image.classList.add("element__image");

  const elementInfo = document.createElement("div");
  elementInfo.classList.add("element__info");

  const elementTitle = document.createElement("h2");
  elementTitle.classList.add("element__title");

  const elementLike = document.createElement("div");
  elementLike.classList.add("element__like");

  image.addEventListener("click", () => {
    popupPhoto.querySelector(".popup__image").src = picURL;
    popupPhoto.querySelector(".popup__card_title").innerHTML = placeName;
    popupPhoto.classList.toggle("active");
  });



  elementLike.addEventListener("click", liking);

  const elementTrashIcon = document.createElement("button");
  elementTrashIcon.classList.add("element__image_trash");

  image.src = picURL;
  elementTitle.textContent = placeName;
  elementInfo.append(elementTitle, elementLike);

  element.append(elementTrashIcon);

  element.append(image, elementInfo);
  elements.prepend(element);

  elementTrashIcon.addEventListener("click", (e) => {
    elements.removeChild(elementTrashIcon.parentElement);
  });
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
  console.log(card);
  addNewCard(card.name, card.link);
});
