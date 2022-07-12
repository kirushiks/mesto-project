import "../pages/index.css";

import * as api from "./api.js";

import { enableValidation } from "./validate";
import { initCards } from "./card";
import { initForms } from "./forms.js";
import { state } from "./state";

const init = async () => {
  await Promise.all([api.getUser(), api.getCards()])
    .then(([owner, cards]) => {
      state.ownerId = owner._id;
      initForms({ owner });
      initCards(cards);

      enableValidation({
        formSelector: ".form",
        inputSelector: ".popup__field",
        inputTypingClass: "popup__field_type",
        submitButtonSelector: ".popup__btn",
        inactiveButtonClass: "popup__btn_unavailable",
        inputErrorClass: "popup__field_type_error",
        errorClass: "error_message_active",
      });
    })
    .catch(console.log);
};

init();
