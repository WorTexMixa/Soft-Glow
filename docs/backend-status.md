
# Soft Glow Backend Status

Цей документ описує поточний стан backend-частини дипломного проєкту Soft Glow.

## Загальна інформація

Backend реалізований для веб-орієнтованої інформаційної системи управління діяльністю салону краси Soft Glow.

Основна задача backend — замінити збереження даних у localStorage на повноцінну роботу з MySQL через REST API.

---

## Технології backend

У backend-частині використовуються:

```text
Node.js
Express
MySQL
mysql2
dotenv
cors
bcrypt
jsonwebtoken
nodemon
````

---

## Структура backend

Основна структура backend:

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

---

## База даних

Створено базу даних:

```text
soft_glow_db
```

Основні таблиці:

```text
users
services
masters
appointments
```

Для бази даних підготовлено SQL-файли:

```text
database/init.sql
database/seed.sql
```

Файл `init.sql` створює структуру бази даних.

Файл `seed.sql` очищає тестові дані та додає базові послуги й майстрів.

---

## Реалізовані можливості

### 1. Базовий сервер

Реалізовано Express-сервер.

Готові тестові endpoints:

```text
GET /api/health
GET /api/db-test
```

`/api/health` перевіряє роботу backend.

`/api/db-test` перевіряє підключення до MySQL.

---

### 2. Авторизація

Реалізовано:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Можливості:

```text
реєстрація користувача
вхід користувача
хешування пароля через bcrypt
створення JWT-токена
отримання поточного користувача за токеном
```

Пароль не зберігається у відкритому вигляді. У базу записується bcrypt-хеш.

---

### 3. Ролі користувачів

У системі є дві ролі:

```text
user
admin
```

`user` — звичайний клієнт салону.

`admin` — адміністратор, який може керувати послугами, майстрами та записами.

---

### 4. Middleware

Реалізовано middleware:

```text
authMiddleware
optionalAuthMiddleware
adminMiddleware
notFoundMiddleware
errorMiddleware
```

`authMiddleware` перевіряє JWT-токен.

`optionalAuthMiddleware` дозволяє створювати запис як гостю або як авторизованому користувачу.

`adminMiddleware` перевіряє роль admin.

`notFoundMiddleware` повертає JSON-відповідь для неіснуючих routes.

`errorMiddleware` використовується для централізованої обробки помилок.

---

### 5. Послуги

Реалізовано CRUD для послуг:

```text
GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

Публічно доступний endpoint:

```text
GET /api/services
```

Тільки admin може:

```text
створювати послуги
редагувати послуги
видаляти послуги
```

---

### 6. Майстри

Реалізовано CRUD для майстрів:

```text
GET    /api/masters
POST   /api/masters
PUT    /api/masters/:id
DELETE /api/masters/:id
```

Публічно доступний endpoint:

```text
GET /api/masters
```

Тільки admin може:

```text
створювати майстрів
редагувати майстрів
видаляти майстрів
```

---

### 7. Записи клієнтів

Реалізовано API для записів:

```text
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/my
PUT    /api/appointments/:id/status
DELETE /api/appointments/:id
```

Гість може створити запис без реєстрації.

Якщо користувач авторизований, запис прив’язується до його `user_id`.

Звичайний користувач може переглядати тільки свої записи.

Адмін може:

```text
бачити всі записи
змінювати статус запису
видаляти записи
```

Доступні статуси запису:

```text
pending
confirmed
cancelled
completed
```

---

## Документація

Створено документацію:

```text
docs/backend-api.md
docs/frontend-api-notes.md
backend/README.md
```

`backend-api.md` містить опис усіх backend endpoints.

`frontend-api-notes.md` містить підказки для заміни localStorage на fetch-запити.

`backend/README.md` містить інструкцію для запуску backend, налаштування `.env`, бази даних і seed-даних.

---

## Що залишилось зробити

Перед повним завершенням backend бажано:

```text
1. Перевірити всі endpoints через Thunder Client.
2. Підключити frontend до backend через fetch.
3. Замінити localStorage для login/register.
4. Замінити localStorage для services.
5. Замінити localStorage для masters.
6. Замінити localStorage для appointments.
7. Перевірити роботу ролей user/admin на frontend.
8. Додати фінальні скриншоти для дипломної роботи.
```

---

## Поточний висновок

Backend-частина має базову повноцінну структуру REST API.

Реалізовано роботу з користувачами, авторизацією, ролями, послугами, майстрами та записами клієнтів.

Backend готовий до поступового підключення frontend-частини замість localStorage.

