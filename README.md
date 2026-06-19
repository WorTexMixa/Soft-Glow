# Soft Glow CRM

Короткий опис проєкту.

## Про проєкт

Що це за система і для чого вона потрібна.

## Основні можливості

- Перегляд послуг
- Перегляд майстрів
- Онлайн-запис клієнта
- Реєстрація та авторизація
- Особистий кабінет користувача
- Адмін-панель
- CRUD для послуг і майстрів

## Технології

Frontend:
- React
- React Router
- Vite
- JavaScript
- CSS

Backend:
- Node.js
- Express
- MySQL
- JWT
- bcrypt

## Архітектура

Frontend React → REST API → Backend Express → MySQL

Користувач працює з React frontend. Frontend надсилає HTTP-запити до REST API. Backend на Node.js та Express обробляє запити, працює з MySQL і повертає JSON-відповідь.

Детальніше: [Architecture](docs/architecture.md)

## Структура проєкту

frontend/
backend/
database/
docs/

## Як запустити проєкт

Інструкція запуску frontend/backend.

## API

## Auth

POST /api/auth/register  
Реєстрація користувача.

POST /api/auth/login  
Авторизація користувача.

## Services

GET /api/services  
Отримати список послуг.

POST /api/services  
Додати послугу. Доступно адміністратору.

PUT /api/services/:id  
Оновити послугу. Доступно адміністратору.

DELETE /api/services/:id  
Видалити послугу. Доступно адміністратору.

Детальний опис API: [API Documentation](docs/api.md)

