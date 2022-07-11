const TOKEN = "9276f40f-54c8-483e-8c73-e0173e1ddf50";
const groupId = "plus-cohort-13";

const config = {
  apiRoot: `https://mesto.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
};

export const getUser = async () => {
  return fetch(`${config.apiRoot}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

/**
 *
 * @param {string} name - name of user
 * @param {string} about - description of user
 *
 * @returns
 */
export const editUser = async (name, about) => {
  return fetch(`${config.apiRoot}/users/me`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getCards = async () => {
  return await fetch(`${config.apiRoot}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
/**
 *
 * @param {string} name - name of card you add
 * @param {string} link - link of image on card you add
 *
 * @returns
 */
export const addCard = async (name, link) => {
  return fetch(`${config.apiRoot}/cards`, {
    method: "POST",
    headers: config.headers,

    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
/**
 *
 * @param {string} cardId - id of card you delete
 *
 * @returns
 */
export const deleteCard = async (cardId) => {
  return fetch(`${config.apiRoot}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
/**
 *
 * @param {string} cardId - id of card you like
 *
 * @returns
 */
export const putLike = async (cardId) => {
  return fetch(`${config.apiRoot}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
/**
 *
 * @param {string} cardId - id of card you dislike
 *
 * @returns
 */
export const deleteLike = async (cardId) => {
  return fetch(`${config.apiRoot}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
/**
 *
 * @param {string} imgLink - link of image you replace insted of current avatar
 *
 * @returns
 */
export const changeAvatar = async (imgLink) => {
  return fetch(`${config.apiRoot}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      avatar: imgLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
