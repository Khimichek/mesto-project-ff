# Проектная работа Mesto
Интерактивная веб-страница, на которой можно размещать фотографии, удалять их и ставить лайки.

**[Посмотреть страницу ⬅️](https://khimichek.github.io/mesto-project-ff/)**

<img src="./readme.gif" />

**[Ссылка на макет Figma](https://www.figma.com/design/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0-1&t=zztrAQxg3velV0hm-0)**

## Что было сделано?

**1. Разработана валидация форм.**  

Валидация формы «Редактировать профиль»:  
* оба поля обязательные  
* в поле «Имя» должно быть от 2 до 40 символов  
* в поле «О себе» должно быть от 2 до 200 символов  
* оба поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы  

Валидация формы «Новое место»:  
* оба поля обязательные  
* в поле «Название» должно быть от 2 до 30 символов.  
* в поле «Ссылка на картинку» должен быть URL  
* поле «Название» может содержать латинские и кириллические буквы, знаки дефиса и пробелы.  
* в поле «Ссылка на картинку» должен быть URL.  

**2. Интеграция c API:**  
* загрузка информации о пользователе с сервера  
* загрузка карточек с сервера  
* редактирование профиля  
* добавление новой карточки  
* отображение количества лайков карточки  
* удаление карточки, через попап удаления карточки  
* постановка и снятие лайка  
* обновление аватара пользователя  
* улучшен UX всех форм, добавлено уведомление «Сохранение...», пока данные загружаются с сервера  

**3. [Деплой на GitHub Pages](https://khimichek.github.io/mesto-project-ff/)**

## Технологии
* HTML, CSS, JavaScript, Webpack

## Установка и запуск

### Требования
Для установки и запуска проекта, необходим NodeJS v8+.

### Установка зависимостей
Для установки зависимостей, выполните команду:
```
$ npm i
```

### Запуск Dev сервера
Чтобы запустить сервер для разработки, выполните команду:
```
npm run dev
```
### Другие активные скрипты   
Для сборки проекта:
```
npm run build
```
Для сборки проекта перед деплоем:
```
npm run predeploy
```
Для деплоя проекта:
```
npm run deploy
```