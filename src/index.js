import './styles/index.css'; // импорт главного файла стилей 
import { openPopup, closePopup, popupsArray } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, validationConfig, clearValidation } from './components/validation';
import { getUser, getCards, editProfile, addCard, editAvatar } from './components/api';

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
//открытие и закрытие модального окна
const profilePopup = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const newCardPopup = document.querySelector('.popup_type_new-card'); //попап добавления новой карточки
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const closeButtonsArray = Array.from(document.querySelectorAll('.popup__close')); // Нашли все кнопки закрытия по универсальному селектору
//редактирование имени и информации о себе
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
//форма добавления карточки
let userId;
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements['link'];
//форма смены аватара
const avatarContainer = document.querySelector('.avatar__container');
const formNewAvatar = document.forms['new-avatar'];
const linkAvatarInput = formNewAvatar.elements['link'];
const avatar = document.querySelector('.profile__image');
//кнопка сохранить
const saveEditProfileButton = document.querySelector('.popup__edit-profile-button');
const saveNewPlaceButton = document.querySelector('.popup__new-place-button');
const saveEditAvatarButton = document.querySelector('.popup__edit-avatar-button');

Promise.all([getUser(), getCards()])
   .then(([user, cards]) => {
    setUser(user);
    setCards(cards, user);
   })
   .catch((err) => {
    console.log(err);
   })

// @todo: Подгружаем информацию о пользователе
const setUser = (user) => {
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
  avatar.style = `background-image: url(${user.avatar})`;
  userId = user._id;
}

// @todo: Вывод карточек на страницу
const setCards = (cards, user) => {
  cards.forEach((card) => {
    const cardConfig = {
      link: card.link,
      name: card.name,
      likes: card.likes,
      owner: card.owner._id,
      cardId: card._id,
      user: user._id,
    }
    cardList.append(createCard(cardConfig, userId, deleteCard, openCardImage, likeCard));
  });
};

// @todo: Открытие попапа редактирования
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // Перед открытием попапа инпуты заполняются актуальными данными
  jobInput.value = profileJob.textContent;
  clearValidation(profilePopup, validationConfig);
  openPopup(profilePopup);
});

// @todo: Открытие попапа добавления карточки
addButton.addEventListener('click', ()=> {
  formNewCard.reset();
  clearValidation(newCardPopup, validationConfig);
  openPopup(newCardPopup); 
});

// @todo: Открытие попапа смены аватара
avatarContainer.addEventListener('click', ()=> {
  console.dir(avatarContainer);
  formNewAvatar.reset();
  clearValidation(editAvatarPopup, validationConfig);
  openPopup(editAvatarPopup); 
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
  renderLoading(saveEditProfileButton, true);
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
  })
  .finally(() => {
    renderLoading(saveEditProfileButton, false);
  }); 
}
formEditProfile.addEventListener('submit', handleFormSubmit);

// @todo: Форма добавления карточки
function addNewCard(evt) {
  evt.preventDefault(); 
  renderLoading(saveNewPlaceButton, true);
  addCard({name: placeNameInput.value, link: linkInput.value})
  .then((card, user) => {
    const cardConfig = {
      link: card.link,
      name: card.name,
      likes: card.likes,
      owner: card.owner._id,
      cardId: card._id,
    };
    cardList.prepend(createCard(cardConfig, userId, deleteCard, openCardImage, likeCard));
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  closePopup(newCardPopup)
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderLoading(saveNewPlaceButton, false);
  }); 
}
formNewCard.addEventListener('submit', addNewCard);

// @todo: Форма смены аватара
function addNewAvatar(evt) {
  evt.preventDefault(); 
  renderLoading(saveEditAvatarButton, true);
  editAvatar(linkAvatarInput.value)
  .then(() => {
    avatar.style = `background-image: url(${linkAvatarInput.value})`;
    formNewAvatar.reset();
    clearValidation(formNewAvatar, validationConfig);
    closePopup(editAvatarPopup)
    console.dir(avatar);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderLoading(saveEditAvatarButton, false);
  }); 
}
formNewAvatar.addEventListener('submit', addNewAvatar);

// @todo: Функция открытия попапа с картинкой
const popupCard = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image'); 
const popupImageText = document.querySelector('.popup__caption'); 

function openCardImage( {name, link} ) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupCard);
}

// @todo: Меняем Сохнанить на Сохранение... во время загрузки
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = `Сохранение...`;
  } else {
    button.textContent = `Сохранить`;
    }
  }

//@todo: Включение валидации
enableValidation(validationConfig);