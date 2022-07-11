import "../pages/index.css";

import * as api from "./api.js";

import { enableValidation } from "./validate";
import { initialCards } from "./card";
import { initialForms } from "./forms.js";
import { state } from "./state";

const initialise = async () => {
  const owner = await api.getUser();
  state.ownerId = owner._id;
  initialForms({ owner });
  initialCards({ ownerId: owner._id });

  enableValidation({
    formSelector: ".form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__btn",
    inactiveButtonClass: "popup__btn_unavailable",
    inputErrorClass: "popup__field_type_error",
    errorClass: "error_message_active",
  });
};

initialise();
