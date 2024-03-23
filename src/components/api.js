const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'ac5ba9ce-77da-4bd7-9861-d8abb08624e7',
    'Content-Type': 'application/json'
  }
}

//Вынесли проверку res.ok в отдельную функцию
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
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
  .then(checkResponse);
}

//Редактирование профиля
export const editProfile = ( {name, about} ) => {
return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ name, about })
}).then (checkResponse);
}

//Добавление новой карточки
export const addCard = ( {name, link} ) => {
 return fetch(`${config.baseUrl}/cards`, { 
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({ name, link })
}).then (checkResponse);
}

//Постановка лайка
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      id: `${cardId}`,
    })
  })
  .then (checkResponse);
}

//Удаление лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      id: `${cardId}`,
    })
  })
  .then (checkResponse);
}

//Удаление карточки
export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
}

//Изменение аватара
export const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar}),
  })
  .then (checkResponse);
}
