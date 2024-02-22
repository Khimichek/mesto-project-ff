import { cardTemplate } from '../index';
import { openPopup } from './modal';

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Функция создания карточки
function createCard(link, name, deleteCard, likeCard, openCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонировала шаблон

  const cardImage = cardElement.querySelector(".card__image"); //переменная изображения
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const deleteButtonClick = () => deleteCard(cardElement);

  const popupCard = document.querySelector('.popup_type_image');
  
  // @todo: Удаление карточки
  deleteButton.addEventListener("click", deleteButtonClick);

  // @todo: Лайк карточки
  const buttonLike = cardElement.querySelector('.card__like-button');
  
  function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active')};
  buttonLike.addEventListener('click', likeCard);
  
  // @todo: Открытие попапа с картинкой
  const popupImage = document.querySelector('.popup__image'); 
  const popupImageText = document.querySelector('.popup__caption'); 

  function openCardImage( {name, link} ) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageText.textContent = name;
    openPopup(popupCard);
  }

  const openPopupImage = () => openCardImage({ name, link });
  cardImage.addEventListener('click', openPopupImage);

  return cardElement;
}

export { createCard, deleteCard };