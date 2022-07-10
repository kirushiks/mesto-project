let closureByEsc;
let closureByClick;

export const closePopup = (element) => {
  if (closureByEsc) {
    document.removeEventListener("keyup", closureByEsc);
    document.removeEventListener("click", closureByClick);
  }
  element.classList.remove("active");
};
const createClosureByEsc = (popup) => (evt) => {
  if (evt.key == "Escape") {
    closePopup(popup);
  }
};
const createClosureByClick = (popup) => (evt) => {
  if (evt.target === popup) {
    closePopup(popup);
  }
};
export const openPopup = (element) => {
  closureByEsc = createClosureByEsc(element);
  closureByClick = createClosureByClick(element);
  document.addEventListener("keyup", closureByEsc);
  document.addEventListener("click", closureByClick);

  element.classList.add("active");
};
export const PhotoModal = {
  popup: document.querySelector("#popup_photo"),
  img: document.querySelector(".popup__image"),
  title: document.querySelector(".popup__card_title"),
};
