import { createCard } from "./card";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
    'Content-Type': 'application/json'
  }
}

/*Запрос к серверу
export const getCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-7/cards', {
    headers: {
      authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
  }*/

//Вынесли проверку res.ok в отдельную функцию
function checkResponse(res) {
  if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//Загрузка информации о пользователе с сервера
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then (checkResponse);
}

//Загрузка карточек с сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then (checkResponse);
}

export const editProfile = ( {name, about} ) => {
return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, about })
}).then (checkResponse);
}

export const addCard = ( {name, link} ) => {
 return fetch(`${config.baseUrl}/cards`, { 
  method: 'POST',
  headers: {
    authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, link })
}).then (checkResponse);
}

export const putLike = (cardId) => {
  //console.log(id);
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: `${cardId}`,
      // likes: `${likes}`
    })
  })
  .then (checkResponse);
}

export const removeLike = (cardId) => {
  //console.log(id);
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: `${cardId}`,
      // likes: `${likes}`
    })
  })
  .then (checkResponse);
}

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
      'Content-Type': 'application/json'
    },
  })
  .then(checkResponse);
}

