import './styles/index.css'; // импорт главного файла стилей 
import { initialCards } from './scripts/cards';

// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content; // получила содержимое template, обратившись к его свойству content

// @todo: DOM узлы
const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонировала шаблон
const cardsList = document.querySelector(".places__list");
const card = document.querySelector(".places__item");

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

  deleteButton.addEventListener("click", deleteButtonClick);

  const buttonLike = cardElement.querySelector('.card__like-button');
  
  // @todo: Лайк карточки
  function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active')};
  buttonLike.addEventListener('click', likeCard);

  // @todo: Открытие попапа с картинкой
  const popupImage = document.querySelector('.popup__image'); 
  const popupImageText = document.querySelector('.popup__caption'); 
  const popupCard = document.querySelector('.popup_type_image');
  
  function openCardImage({ name, link }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageText.textContent = name;
    openPopup(popupCard);
  }

  const openPopupImage = () => openCardImage({ name, link });
  cardImage.addEventListener('click', openPopupImage);

  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, deleteCard);
  cardsList.append(cardElement);
});

// @todo: Открытие и закрытие модального окна
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
let target = '';
const closeButtonsArray = Array.from(document.querySelectorAll('.popup__close')); // Нашли все кнопки закрытия по универсальному селектору
const popupsArray = Array.from(document.querySelectorAll('.popup'));

// @todo: 1.Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", closePopupEsc);
}

// @todo: 1.1.Открытие попапа редактирования
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // Перед открытием попапа инпуты заполняются актуальными данными
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

// @todo: 1.2.Открытие попапа добавления карточки
addButton.addEventListener('click', ()=> openPopup(newCardPopup)); 

// @todo: 1.Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopupEsc);
};

// @todo: 1.1.Закрытие попапа по крестику
closeButtonsArray.forEach((button) => {
  const popup = button.closest('.popup'); // Нашли ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup));
});

// @todo: 1.2.Закрытие попапа по оверлэю
popupsArray.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// @todo: 1.2.Функция закрытия попапа по ESC
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// @todo: Редактирование имени и информации о себе
const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;

    profileName.textContent = newNameInput;
    profileJob.textContent = newJobInput;
    closePopup(popup);
}
formElement.addEventListener('submit', handleFormSubmit); 

// @todo: Форма добавления карточки
const placesList = document.querySelector('.places__list');

const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];

function addNewCard(evt) {
    evt.preventDefault(); 

    const newPlaceNameInput = placeNameInput.value;
    const newLinkInput = linkInput.value;

    const createNewCard = createCard(newLinkInput, newPlaceNameInput, deleteCard);

    placesList.prepend(createNewCard);
    closePopup(newCardPopup);
    formNewCard.reset();
  }
formNewCard.addEventListener('submit', addNewCard);
