import './styles/index.css'; // импорт главного файла стилей 
import { initialCards } from './scripts/cards';

import { openPopup, closePopup } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';

import { enableValidation, validationConfig, clearValidation } from './components/validation';

import { getUser, getCards, editProfile } from './components/api';

Promise.all([getUser(), getCards()])
/*  Можно сразу деструктурировать полученный кортеж */
   .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    cards.forEach((card) => {
      //createCard(link, name, deleteCard, likeCard, openCardImage);
      //cardList.append(createCard(link, name, deleteCard, likeCard, openCardImage))
      const cardElement = createCard(card.link, card.name, deleteCard, likeCard, openCardImage);
      cardsList.append(cardElement);
      /*initialCards.forEach(function (card) {
        const cardElement = createCard(card.link, card.name, deleteCard, likeCard, openCardImage);
        cardsList.append(cardElement);*/
      });
    })
   .catch((err) => {
    console.log(`Ошибка: ${err}`);
   })

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");
const card = document.querySelector(".places__item");
//открытие и закрытие модального окна
const profilePopup = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const newCardPopup = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const closeButtonsArray = Array.from(document.querySelectorAll('.popup__close')); // Нашли все кнопки закрытия по универсальному селектору
export const popupsArray = Array.from(document.querySelectorAll('.popup'));
//редактирование имени и информации о себе
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
//форма добавления карточки
const placesList = document.querySelector('.places__list');
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];
/*
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, deleteCard, likeCard, openCardImage);
  cardsList.append(cardElement);
});*/

// @todo: Открытие попапа редактирования
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // Перед открытием попапа инпуты заполняются актуальными данными
  jobInput.value = profileJob.textContent;
  clearValidation(profilePopup, validationConfig);
  openPopup(profilePopup);
});

// @todo: Открытие попапа добавления карточки
addButton.addEventListener('click', ()=> {
  placeNameInput.value = '';
  linkInput.value = '';
  clearValidation(newCardPopup, validationConfig);
  openPopup(newCardPopup); 
});


// @todo: Закрытие попапа по крестику
closeButtonsArray.forEach((button) => {
  const popup = button.closest('.popup'); // Нашли ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup));
});

// @todo: Закрытие попапа по оверлэю
popupsArray.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// @todo: Редактирование имени и информации о себе
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    editProfile({ name: nameInput.value, about: jobInput.value })
      .then(() => {
        const newNameInput = nameInput.value;
        const newJobInput = jobInput.value;
        profileName.textContent = newNameInput;
        profileJob.textContent = newJobInput;
        enableValidation(validationConfig);
        closePopup(profilePopup);
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}
formEditProfile.addEventListener('submit', handleFormSubmit);

// @todo: Форма добавления карточки
function addNewCard(evt) {
    evt.preventDefault(); 

    const newPlaceNameInput = placeNameInput.value;
    const newLinkInput = linkInput.value;

    const createNewCard = createCard(newLinkInput, newPlaceNameInput, deleteCard, likeCard, openCardImage);

    placesList.prepend(createNewCard);
    closePopup(newCardPopup);
    formNewCard.reset();
  }
formNewCard.addEventListener('submit', addNewCard);

// @todo: Функция открытия попапа с картинкой
const popupCard = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image'); 
const popupImageText = document.querySelector('.popup__caption'); 

export function openCardImage( {name, link} ) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupCard);
}

//Включение валидации
enableValidation(validationConfig);