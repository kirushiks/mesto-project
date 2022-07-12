export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closeByEscape);
};

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  popup
    .querySelector(".popup__button_close")
    .addEventListener("click", (evt) => {
      closePopup(popup);
    });
});

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closeByEscape);
};
export const PhotoModal = {
  popup: document.querySelector("#popup_photo"),
  img: document.querySelector(".popup__image"),
  title: document.querySelector(".popup__card_title"),
};
