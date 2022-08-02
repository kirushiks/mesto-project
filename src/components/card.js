export class Card {
  constructor(
    { name, link, likes, owner, _id },
    { handleZoomClick, handleDeleteClick, handleDeleteLike, handlePutLike },
    templateSelector,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.owner = owner._id;
    this._id = _id;

    this._handleDeleteClick = handleDeleteClick;
    this._handleZoomClick = handleZoomClick;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;

    this._templateSelector = templateSelector;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.children[0].cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector(".grid__like-button");
    this._cardImage = this._card.querySelector("#grid__image");
    this._cardTitle = this._card.querySelector(".grid__title");
    this._cardLikeCounter = this._card.querySelector(".grid__like-counter");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._putDeleteSign();

    this._cardLikeCounter.textContent = this._likes.length;
    this.isLiked();

    this._setEventListeners();

    // Возвращает готовую наполненную данными карточку
    return this._card;
  }

  // Навешивает корзинку
  _putDeleteSign() {
    this._cardDeleteBin = this._card.querySelector(".grid__bin");

    if (this._userId !== this._owner) {
      this._cardDeleteBin.remove();
    }
  }

  _setEventListeners() {
    // Удаление
    this._cardDeleteBin.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
    // Лайк
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("grid__like-button_active")) {
        this._handleDeleteLike(this._id);
      } else {
        this._handlePutLike(this._id);
      }
    });
    // Зум
    this._cardImage.addEventListener("click", () => {
      this._handleZoomClick(this._name, this._link);
    });
  }

  likeCardOption(dataFromServer) {
    this._likes = dataFromServer.likes;
    this._cardLikeCounter.textContent = this._likes.length;

    this._likeButton.classList.toggle("grid__like-button_active");
  }

  isLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add("grid__like-button_active");
    }
  }

  getCardId() {
    return this._id;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
