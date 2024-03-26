import { putLike, removeLike, removeCard } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content; // получила содержимое template, обратившись к его свойству content

// @todo: Функционал клонирования шаблона вынесен в отдельную функцию
function getCardTemplate() {
  const cloneCardTemplate = cardTemplate.querySelector(".card").cloneNode(true);
  return cloneCardTemplate;
}

// @todo: Функция удаления карточки
export function deleteCard(card, cardId) {
  removeCard(cardId)
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
}

// @todo: Функция лайка карточки
export function likeCard(buttonLike, cardId, cardLikeCounter) {
  if (!buttonLike.classList.contains('card__like-button_is-active')) {
    buttonLike.classList.add('card__like-button_is-active');
    putLike(cardId)
    .then((result) => {
      cardLikeCounter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  } else {
    buttonLike.classList.remove('card__like-button_is-active');
    removeLike(cardId)
    .then ((result) => {
      cardLikeCounter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  }
}

// @todo: Функция создания карточки
export function createCard(cardConfig, userId, deleteCard, openCardImage, likeCard) {
  const cardElement = getCardTemplate();
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector(".card__image"); //переменная изображения
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const buttonLike = cardElement.querySelector('.card__like-button');

  cardImage.src = cardConfig.link;
  cardTitle.textContent = cardConfig.name;
  cardImage.alt = cardConfig.name; 
  
  //@todo: Проверяем, наша карточка или нет (отображаем корзину или нет)
  if (cardConfig.owner === userId) {
    // @todo: Удаление карточки
    deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, cardConfig.cardId);
    });
  } else {
    deleteButton.remove();
    }
  
  // @todo: Открытие попапа с картинкой
  cardImage.addEventListener("click", (evt) => {
    openCardImage({
      name: cardTitle.textContent,
      link: cardImage.src
    });
  });

  //@todo: Вывели текущее кол-во лайков
  cardLikeCounter.textContent = cardConfig.likes.length;
  
  //@todo: Проверка на наш лайк
  cardConfig.likes.forEach((cardConfig) => {
    if (cardConfig.card === cardConfig.user) {
      buttonLike.classList.add('card__like-button_is-active');
    }
  });

  //@todo: Вызов функции лайка
  buttonLike.addEventListener("click", () => {
    likeCard(buttonLike, cardConfig.cardId, cardLikeCounter);
  });

  return cardElement;
}

//////////