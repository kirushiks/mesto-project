/**
 * @param {string} form - Название книги
 * @param {Array} input - Автор книги
 * @param {string} options - Автор книги
 */
 export const validate = (form, input, errorMessage, options) => {
  if (input.validity.valid) {
    errorMessage.textContent = "";
    errorMessage.classList.remove("error_message_active");
    return;
  }
  if (input.value.length == 0) {
    errorMessage.textContent = "enter text";
    errorMessage.classList.add("error_message_active");
    return;
  }
  if (!input.validity.typeMismatch) {
    errorMessage.textContent = "invalid input";
    errorMessage.classList.add("error_message_active");
    return;
  }
};

const preventDefaultFunction = (evt) => evt.preventDefault();

export const checkSubmitable = (form, submitButton, listener) => {
  console.log(form);
  if (form.checkValidity()) {
    submitButton.classList.remove("popupbtn_unavailable");
    form.addEventListener("submit", listener);
    form.removeEventListener("submit", preventDefaultFunction);
  } else {
    submitButton.classList.add("popupbtn_unavailable");
    form.addEventListener("submit", preventDefaultFunction);
    form.removeEventListener("submit", listener);
  }
};
