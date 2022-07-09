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
  if (elementLike.classList.contains("elementlike")) {
    elementLike.classList.remove("elementlike");
    elementLike.classList.add("elementlike_active");
  } else {
    elementLike.classList.add("elementlike");
    elementLike.classList.remove("element__like_active");
  }
};

const handleSubmitFormer = (form) => (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(form.popup);
};
