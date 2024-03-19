import { putLike, removeLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content; // получила содержимое template, обратившись к его свойству content

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

//const myID = '3f49a1cfbac0b09d7dd03c0a';


// @todo: Функция создания карточки
function createCard(cardConfig, deleteCard, openCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонировала шаблон
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector(".card__image"); //переменная изображения

  //console.dir(userId);

  cardImage.src = cardConfig.link;
  cardTitle.textContent = cardConfig.name;
  cardImage.alt = cardConfig.name;
  //const myId = _id;  
  
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const deleteButtonClick = () => deleteCard(cardElement);
  // @todo: Удаление карточки
  deleteButton.addEventListener("click", deleteButtonClick);
  
  // @todo: Открытие попапа с картинкой
  cardImage.addEventListener("click", (evt) => {
    openCardImage({
      name: cardTitle.textContent,
      link: cardImage.src
    });
  });

  //@todo: Лайк карточки
  const cardLikeBox = cardElement.querySelector('.card__like-box');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const buttonLike = cardElement.querySelector('.card__like-button');
  cardLikeCounter.textContent = cardConfig.likes.length;

  cardConfig.likes.forEach((card) => {
    if (card._id === cardConfig.userId) {
      buttonLike.classList.add("card__like-button_is-active");
    }
  });

  //Вызов функции лайка
  buttonLike.addEventListener('click', function(evt) {
    if (buttonLike.classList.contains('card__like-button_is-active')) {
      evt.target.classList.toggle('card__like-button_is-active');
      removeLike(cardConfig.cardId, 'DELETE')
      .then((result) => {
        cardLikeCounter.textContent = result.likes.length;
      })
    } else {
      evt.target.classList.toggle('card__like-button_is-active');
      putLike(cardConfig.cardId, 'PUT')
      .then ((result) => {
        cardLikeCounter.textContent = result.likes.length;
      });
    }
  });
  return cardElement;
}

export { createCard, deleteCard };