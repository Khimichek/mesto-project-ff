// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content; // получила содержимое template, обратившись к его свойству content

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");
const card = document.querySelector(".places__item");

// @todo: Функция создания карточки
function createCard(link, name, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонировала шаблон

  const cardImage = cardElement.querySelector(".card__image"); //переменная изображения
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const deleteButtonClick = () => deleteCard(cardElement);

  deleteButton.addEventListener("click", deleteButtonClick); // обработчик клика
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card.link, card.name, deleteCard);
  cardsList.append(cardElement);
});
