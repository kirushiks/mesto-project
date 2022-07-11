import * as api from "./api";

import { buildCard, createCard, elements } from "./card";
import { closePopup, openPopup } from "./modal.js";

import { state } from "./state";

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");

const avatarImg = document.querySelector(".profile__avatar");

// initialise forms incapsulated one
const profile = {
  form: document.forms.profile,
  openFormButton: document.querySelector(".profile__edit-button"),
  submitButton: document.forms.profile.querySelector("#popup_btn_save"),
  popup: document.querySelector("#popup_edit"),
};
const newPlace = {
  form: document.forms.newplace,
  openFormButton: document.querySelector(".profile__add-button"),
  submitButton: document.querySelector("#popup_btn_create"),
  popup: document.querySelector("#popup_newplace"),
};

const avatar = {
  form: document.forms.avatar,
  openFormButton: document.querySelector(".profile__avatar_editor_button"),
  submitButton: document.querySelector("#popup_btn_edit_avatar"),
  popup: document.querySelector("#popup_edit_avatar"),
};

// adds open forms on button

profile.openFormButton.addEventListener("click", () => {
  profile.form["popup-form-name"].value = profileName.textContent;
  profile.form["popup-form-info"].value = profileJob.textContent;

  openPopup(profile.popup);
});

newPlace.openFormButton.addEventListener("click", () => {
  openPopup(newPlace.popup);
});

avatar.openFormButton.addEventListener("click", () => {
  avatar.form["popup-form-avatar_link"].value = avatarImg.src;
  openPopup(avatar.popup);
});

// handlers of submittimg
const handleAvatarForm = async (evt) => {
  evt.preventDefault();
  avatar.submitButton.textContent = "Сохранение...";

  await api
    .changeAvatar(avatar.form["popup-form-avatar_link"].value)
    .then((user) => {
      avatarImg.src = user.avatar;

      closePopup(avatar.popup);
    })
    .catch(() => {
      console.log("Asdsadaasddas");
    })
    .finally(() => {
      avatar.submitButton.textContent = "Сохранить";
    });
};

const handleProfileForm = async (evt) => {
  evt.preventDefault();

  profile.submitButton.textContent = "Сохранение...";

  await api
    .editUser(
      profile.form["popup-form-name"].value,
      profile.form["popup-form-info"].value
    )
    .then((user) => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;

      closePopup(profile.popup);
    })
    .catch(() => {
      console.log("Something went wrong and you didn't change profile");
    })
    .finally(() => {
      profile.submitButton.textContent = "Сохранить";
    });
};

const handleNewPlaceForm = async (evt) => {
  evt.preventDefault();
  newPlace.submitButton.textContent = "Сохранение...";
  await createCard(
    newPlace.form["popup-form-name"].value,
    newPlace.form["popup-form-info"].value
  )
    .then((card) => {
      newPlace.submitButton.textContent = "Сохранить";

      elements.prepend(buildCard(card, { ownerId: state?.ownerId }));
      newPlace.form.reset();
      newPlace.submitButton.setAttribute("disabled", true);
      newPlace.submitButton.classList.add("popup__btn_unavailable");
      closePopup(newPlace.popup);
    })
    .catch(() => {
      newPlace.submitButton.textContent = "ERROR ERROR ERROR";
    });
};

// close every popup by line-by-line

document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector(".popup__button_close")
    .addEventListener("click", (evt) => {
      closePopup(popup);
    });
});

export const initialForms = (initialData) => {
  newPlace.submitButton.addEventListener("click", handleNewPlaceForm);
  profile.submitButton.addEventListener("click", handleProfileForm);
  avatar.submitButton.addEventListener("click", handleAvatarForm);

  const { owner } = initialData;
  avatarImg.src = owner.avatar;
  profileName.textContent = owner.name;
  profileJob.textContent = owner.about;
  profile.form["popup-form-name"].value = owner.name;
  profile.form["popup-form-info"].value = owner.about;
  avatar.form["popup-form-avatar_link"].value = owner.avatar;
};
