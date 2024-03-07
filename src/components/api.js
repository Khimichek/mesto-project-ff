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
}).then (checkResponse)
}
