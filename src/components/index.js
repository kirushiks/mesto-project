import "../pages/index.css";

import { checkSubmitable, validate } from "./validate";
import { closePopup, openPopup } from "./utils.js";
import { createCard, elements, initialiseCards } from "./card.js";

const popupToggleEdit = document.querySelector(".profile__edit-button");

const popupToggleAdd = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
const profileForm = {
  form: document.forms.profile,
  submitButton: document.querySelector("#popup_btn_save"),
  popup: document.querySelector("#popup_edit"),
  inputs: {
    name: {
      input: document.forms.profile["popup-form-name"],
      errorMessage: document.querySelector(
        "#popup-form-profile-name-error-message"
      ),
    },
    info: {
      input: document.forms.profile["popup-form-info"],
      errorMessage: document.querySelector(
        "#popup-form-profile-info-error-message"
      ),
    },
  },
};
const newPlaceForm = {
  form: document.forms.newplace,
  submitButton: document.querySelector("#popup_btn_create"),
  popup: document.querySelector("#popup_newplace"),
  inputs: {
    name: {
      input: document.forms.newplace["popup-form-name"],
      errorMessage: document.querySelector(
        "#popup-form-newplace-name-error-message"
      ),
    },
    info: {
      input: document.forms.newplace["popup-form-info"],
      errorMessage: document.querySelector(
        "#popup-form-newplace-info-error-message"
      ),
    },
  },
};

popupToggleEdit.addEventListener("click", () => {
  profileForm.inputs.name.input.value = profileName.textContent;
  profileForm.inputs.info.input.value = profileJob.textContent;
  checkSubmitable(profileForm.form, profileForm.submitButton, handleSubmitForm);

  openPopup(profileForm.popup);
});
const handleSubmitForm = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileForm.inputs.name.input.value;
  profileJob.textContent = profileForm.inputs.info.input.value;

  closePopup(profileForm.popup);
};
popupToggleAdd.addEventListener("click", () => {
  checkSubmitable(
    newPlaceForm.form,
    newPlaceForm.submitButton,
    handleNewPlaceForm
  );
  openPopup(newPlaceForm.popup);
});
const handleNewPlaceForm = (evt) => {
  evt.preventDefault();

  elements.prepend(
    createCard(
      newPlaceForm.inputs.name.input.value,
      newPlaceForm.inputs.info.input.value
    )
  );

  newPlaceForm.form.reset();
  closePopup(newPlaceForm.popup);
};

profileForm.form.addEventListener("input", () => {
  Object.entries(profileForm.inputs).forEach(([fieldName, field]) => {
    validate(profileForm.form, field.input, field.errorMessage);
  });
  checkSubmitable(profileForm.form, profileForm.submitButton, handleSubmitForm);
});

newPlaceForm.form.addEventListener("input", () => {
  Object.entries(newPlaceForm.inputs).forEach(([fieldName, field]) => {
    validate(newPlaceForm.form, field.input, field.errorMessage);
  });
  checkSubmitable(
    newPlaceForm.form,
    newPlaceForm.submitButton,
    handleNewPlaceForm
  );
});
initialiseCards();

document.querySelectorAll(".popup").forEach((popup) => {
  popup.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popup);
  });
});
