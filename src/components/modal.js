import { closePopupEsc } from '../index';

// @todo: 1.Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopupEsc);
}

// @todo: 1.Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopupEsc);
};

export { openPopup, closePopup};

