const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `#${inputElement.id}-error_message`
  );
  inputElement.classList.add("popup__field_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("error_message_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `#${inputElement.id}-error_message`
  );
  inputElement.classList.remove("popup__field_type_error");
  errorElement.classList.remove("error_message_active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__btn_unavailable");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__btn_unavailable");
    buttonElement.removeAttribute("disabled");
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__field"));
  const buttonElement = formElement.querySelector(".popup__btn");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};
