# Soft Glow Backend

Backend-частина дипломного проєкту Soft Glow — веб-орієнтованої інформаційної системи управління діяльністю салону краси.

Backend реалізований на Node.js та Express з використанням MySQL як бази даних.

---

## Технології

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- cors
- bcrypt
- jsonwebtoken
- nodemon

---

## Структура backend

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── servicesController.js
│   │   ├── mastersController.js
│   │   └── appointmentsController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── servicesRoutes.js
│   │   ├── mastersRoutes.js
│   │   └── appointmentsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── optionalAuthMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   └── errorMiddleware.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## Встановлення залежностей

Перед запуском backend потрібно встановити npm-пакети:

```bash
npm install
```

---

## Налаштування `.env`

У папці `backend` потрібно створити файл `.env`.

Приклад:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=soft_glow_db
DB_PORT=3306

BCRYPT_SALT_ROUNDS=10

JWT_SECRET=soft_glow_secret_key_2026
JWT_EXPIRES_IN=7d
```

---

## Пояснення змінних `.env`

```text
PORT
```

Порт, на якому запускається backend-сервер.

```text
FRONTEND_URL
```

Адреса frontend-частини. Потрібна для CORS.

```text
DB_HOST
```

Адреса MySQL-сервера.

```text
DB_USER
```

Користувач MySQL.

```text
DB_PASSWORD
```

Пароль MySQL.

```text
DB_NAME
```

Назва бази даних.

```text
DB_PORT
```

Порт MySQL.

```text
BCRYPT_SALT_ROUNDS
```

Кількість раундів хешування пароля.

```text
JWT_SECRET
```

Секретний ключ для створення JWT-токенів.

```text
JWT_EXPIRES_IN
```

Час дії JWT-токена.

---

## Запуск backend

### Режим розробки

```bash
npm run dev
```

Цей режим запускає сервер через nodemon. Сервер автоматично перезапускається після змін у файлах.

---

### Звичайний запуск

```bash
npm start
```

---

## Основні endpoints

Base URL:

```text
http://localhost:5000/api
```

### Auth

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Services

```text
GET    /services
POST   /services
PUT    /services/:id
DELETE /services/:id
```

### Masters

```text
GET    /masters
POST   /masters
PUT    /masters/:id
DELETE /masters/:id
```

### Appointments

```text
POST   /appointments
GET    /appointments
GET    /appointments/my
PUT    /appointments/:id/status
DELETE /appointments/:id
```

---

## Ролі користувачів

У системі є дві ролі:

```text
user
admin
```

Звичайний користувач може:

- зареєструватися;
- увійти в систему;
- створити запис;
- переглядати свої записи.

Адміністратор може:

- переглядати всі записи;
- змінювати статус запису;
- видаляти записи;
- керувати послугами;
- керувати майстрами.

---

## Перевірка роботи сервера

Після запуску backend можна перевірити:

```text
GET http://localhost:5000/api/health
```

Очікувана відповідь:

```json
{
  "message": "Soft Glow backend is working",
  "status": "OK"
}
```

---

## Перевірка підключення до MySQL

```text
GET http://localhost:5000/api/db-test
```

Очікувана відповідь:

```json
{
  "message": "Database connection is working",
  "result": 2
}
```

---

## База даних

SQL-структура бази даних знаходиться у файлі:

```text
database/init.sql
```

Основні таблиці:

```text
users
services
masters
appointments
```

---

## Примітка

Файл `.env` не потрібно додавати в GitHub, тому що він може містити паролі та секретні ключі.

У `.gitignore` має бути:

```gitignore
node_modules/
.env
```
