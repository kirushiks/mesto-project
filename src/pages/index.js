import "./index.css";

import {
  avatarForm,
  avatarInput,
  avatarPopup,
  avatarSubmitButton,
  cardFormInput,
  cardPopup,
  cardPopupExitButton,
  cardPopupInputLink,
  cardPopupInputTitle,
  cardSubmitButton,
  cardsContainer,
  closeAvatarProfile,
  imagePopup,
  imagePopupExitButton,
  initialCards,
  jobInfo,
  jobInput,
  myFoto,
  nameInfo,
  nameInput,
  profileAddButton,
  profileAvatar,
  profileEditButton,
  profileForm,
  profilePopup,
  profileResetButton,
  profileSubmitButton,
  validationConfig,
} from "../utils/Constans.js";

import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { data } from "autoprefixer";

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "5c5cae68-2e6e-4cb2-b8b7-784782ac63e0",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileInfoSelector: ".profile__description",
});

const popupZoomCard = new PopupWithImage("#image_popup");
popupZoomCard.setEventListeners();
imagePopupExitButton.addEventListener("click", function () {
  popupZoomCard.close();
});

// заводим переменную
let profileId;

// единовременная загрузка данных карточек и пользователя
api
  .allUploadInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    userInfo.updateUserInfo();
    // не забыть исправить аватар
    myFoto.src = user.avatar;
    profileId = user._id;

    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// формируем карточку, наполняем данными
const getFullCard = (item) => {
  const card = new Card(
    item,
    {
      handleZoomClick: () => {
        popupZoomCard.open(item);
      },

      handleDeleteClick: () => {
        api
          .deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      handlePutLike: () => {
        api
          .putLike(card.getCardId())
          .then((res) => {
            card.likeCardOption(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteLike: () => {
        api
          .deleteLike(card.getCardId())
          .then((res) => {
            card.likeCardOption(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    "#card_template",
    profileId
  );
  return card;
};

// размещвем картинки на странице
const cardsSection = new Section(
  {
    renderer: function (item) {
      const initialCard = getFullCard(item);
      const cardElement = initialCard.createCard(item, profileId);
      cardsSection.addItem(cardElement);
    },
  },
  ".grid"
);

const popup = new Popup(".popup");
popup.setEventListeners();

/*____________________________________________*/

// валидация
const editAvatarPopup = new PopupWithForm({
  popupSelector: "#avatar_popup",
  callbackSubmitForm: (data) => {
    editAvatarPopup.renderLoading(true);
    api
      .editAvatar(data)

      .then((data) => {
        profileAvatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
  },
});

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.forms.avatar
);

avatarFormValidator.enableValidation();

editAvatarPopup.setEventListeners();

closeAvatarProfile.addEventListener("click", function () {
  editAvatarPopup.close();
});

myFoto.addEventListener("click", function () {
  editAvatarPopup.open();
});

//avatarForm.addEventListener('submit', changeAvatar)

/*____________________________________________*/

// валидация
const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile_popup",
  callbackSubmitForm: (data) => {
    editProfilePopup.renderLoading(true);
    api
      .editProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        userInfo.updateUserInfo();
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  },
});

const profileFormValidator = new FormValidator(
  validationConfig,
  document.forms.profile
);

profileFormValidator.enableValidation();

editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", function () {
  editProfilePopup.open();
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
});
profileResetButton.addEventListener("click", function () {
  editProfilePopup.close();
});

/*____________________________________________*/

// валидация
const postCardPopup = new PopupWithForm({
  popupSelector: "#card_popup",
  callbackSubmitForm: (data) => {
    postCardPopup.renderLoading(true);
    api
      .postCard(data)
      .then((data) => {
        cardsSection.addItem(getFullCard(data).createCard(data, profileId));
        postCardPopup.close();
        // обресетить форму
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        postCardPopup.renderLoading(false);
      });
  },
});

const cardFormValidator = new FormValidator(
  validationConfig,
  document.forms.card
);

cardFormValidator.enableValidation();

postCardPopup.setEventListeners();

profileAddButton.addEventListener("click", function () {
  postCardPopup.open();
});
cardPopupExitButton.addEventListener("click", function () {
  postCardPopup.close();
});
