// @todo: Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closePopupEsc);
}

// @todo: Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closePopupEsc);
};

// @todo: Функция закрытия попапа по ESC
export const popupsArray = Array.from(document.querySelectorAll('.popup'));
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

