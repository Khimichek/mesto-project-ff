// @todo: Меняем Сохнанить на Сохранение... во время загрузки
export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = `Сохранение...`;
  } else {
    button.textContent = `Сохранить`;
    }
  }