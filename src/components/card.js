// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content; // получила содержимое template, обратившись к его свойству content

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Лайк карточки
function likeCard (button) {
  button.classList.toggle('card__like-button_is-active');
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
  
  // @todo: Удаление карточки
  deleteButton.addEventListener("click", deleteButtonClick);
  
  // @todo: Открытие попапа с картинкой
  cardImage.addEventListener("click", (evt) => {
    openCardImage({name, link});
  });

  //@todo: Лайк карточки
  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener("click", function () {
    likeCard(buttonLike);
  });

  return cardElement;
}

export { createCard, deleteCard, likeCard };