# Articles Test Case

Тестовое приложение для работы со статьями и комментариями.

Приложение состоит из backend на Node.js/Express и frontend на Vue 3.

## Используемые технологии

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize
- Sequelize CLI

### Frontend

- Vue 3
- Vue Router
- Vuex
- Axios
- Vuetify
- Vite

## Возможности

### Статьи

- просмотр списка статей;
- просмотр отдельной статьи;
- создание статьи;
- редактирование статьи;
- удаление статьи.

### Комментарии

- просмотр комментариев статьи;
- добавление комментария;
- редактирование комментария;
- удаление комментария.

### Аналитика

Получение комментариев за выбранный период с группировкой по статьям.


## Требования

Для запуска проекта необходимы:

- Node.js;
- npm;
- PostgreSQL.

## Настройка базы данных

Создайте PostgreSQL базу данных для проекта.

Например:

```sql
CREATE DATABASE articles_test;
```

Параметры подключения к PostgreSQL находятся в файле:

```text
backend/config/config.json
```

Перед запуском при необходимости измените следующие параметры под свою локальную конфигурацию PostgreSQL:

```json
{
  "username": "postgres",
  "password": "postgres",
  "database": "articles_test",
  "host": "127.0.0.1",
  "dialect": "postgres"
}
```

Значения `username` и `password` должны соответствовать настройкам PostgreSQL на вашей машине.

## Установка backend

Перейдите в директорию backend:

```bash
cd backend
```

Установите зависимости:

```bash
npm install
```

Выполните миграции:

```bash
npx sequelize-cli db:migrate
```

При необходимости заполните базу тестовыми данными:

```bash
npx sequelize-cli db:seed:all
```

Запустите сервер:

```bash
node src/server.js
```

Backend будет доступен по адресу:

```text
http://localhost:3000
```

## Установка frontend

Из корневой директории проекта перейдите в директорию frontend:

```bash
cd frontend
```

Установите зависимости:

```bash
npm install
```

Запустите приложение:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

## API

### Статьи

```text
POST   /article/
GET    /article/:articleId/
GET    /articles/
PATCH  /article/:articleId/
DELETE /article/:articleId/
```

### Комментарии

```text
POST   /article/:articleId/comment/
GET    /article/:articleId/comment/:commentId/
GET    /article/:articleId/comments/
PATCH  /article/:articleId/comment/:commentId/
DELETE /article/:articleId/comment/:commentId/
```

### Аналитика

```text
GET /analytic/comments/?dateFrom=<date>&dateTo=<date>
```

Параметры `dateFrom` и `dateTo` задают период, за который необходимо получить комментарии.