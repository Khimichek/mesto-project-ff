import { popupsArray } from '../index';

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopupEsc);
}

// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopupEsc);
};

// @todo: Функция закрытия попапа по ESC
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup};

