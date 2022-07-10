import "../pages/index.css";

import { closePopup, openPopup } from "./modal.js";
import { createCard, elements, initialiseCards } from "./card.js";

import { enableValidation } from "./validate";

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
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

profile.openFormButton.addEventListener("click", () => {
  profile.form["popup-form-name"].value = profileName.textContent;
  profile.form["popup-form-info"].value = profileJob.textContent;
  openPopup(profile.popup);
});
const handleSubmitForm = (evt) => {
  evt.preventDefault();

  profileName.textContent = profile.form["popup-form-name"].value;
  profileJob.textContent = profile.form["popup-form-info"].value;

  closePopup(profile.popup);
};
newPlace.openFormButton.addEventListener("click", () => {
  openPopup(newPlace.popup);
});
const handleNewPlaceForm = (evt) => {
  evt.preventDefault();

  elements.prepend(
    createCard(
      newPlace.form["popup-form-name"].value,
      newPlace.form["popup-form-info"].value
    )
  );
  newPlace.form.reset();
  newPlace.submitButton.setAttribute("disabled", true);
  newPlace.submitButton.classList.add("popup__btn_unavailable");
  closePopup(newPlace.popup);
};

document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector(".popup__button_close")
    .addEventListener("click", (evt) => {
      closePopup(popup);
    });
});
newPlace.submitButton.addEventListener("click", handleNewPlaceForm);
profile.submitButton.addEventListener("click", handleSubmitForm);

initialiseCards();

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_unavailable",
  inputErrorClass: "popup__field_type_error",
  errorClass: "error_message_active",
});
