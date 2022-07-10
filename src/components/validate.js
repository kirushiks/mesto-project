const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(
    settings.getErrorElementByInput(inputElement)
  );
  inputElement.classList.add(settings.inputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorMessageActive);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(
    settings.getErrorElementByInput(inputElement)
  );
  inputElement.classList.remove(settings.inputTypeError);
  errorElement.classList.remove(settings.errorMessageActive);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.saveButtonDisabled);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.saveButtonDisabled);
    buttonElement.removeAttribute("disabled");
  }
};
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const buttonElement = formElement.querySelector(settings.saveButton);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);

      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.form));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};
