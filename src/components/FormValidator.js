export class FormValidator {
  #settings;
  #formElement;

  constructor(outerSettings, formElement) {
    this.#settings = outerSettings;
    this.#formElement = formElement;
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.#settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#settings.errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.#settings.inputErrorClass);
    errorElement.classList.remove(this.#settings.errorClass);
    errorElement.textContent = "";
  }

  #isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #toggleButtonState(inputList, buttonElement) {
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.#settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this.#settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  #hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #setEventListeners() {
    const inputList = Array.from(
      this.#formElement.querySelectorAll(this.#settings.inputSelector)
    );
    const buttonElement = this.#formElement.querySelector(
      this.#settings.submitButtonSelector
    );
    this.#toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#isValid(inputElement);
        inputElement.classList.add(this.#settings.inputTypingClass);

        this.#toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setEventListeners();
  }
}
