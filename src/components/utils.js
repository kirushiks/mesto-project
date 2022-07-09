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

export const changeLikeStatus = (evt) => {
  const elementLike = evt.currentTarget;
  if (elementLike.classList.contains("element__like")) {
    elementLike.classList.remove("element__like");
    elementLike.classList.add("element__like_active");
  } else {
    elementLike.classList.add("element__like");
    elementLike.classList.remove("element__like_active");
  }
};
