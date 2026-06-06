# Soft Glow Backend Test Checklist

Фінальний чекліст тестування backend API перед підключенням frontend.

Base URL:

```text
http://localhost:5000/api
```

---

## 1. Перевірка запуску сервера

### GET /health

```text
GET http://localhost:5000/api/health
```

Очікувано:

```json
{
  "message": "Soft Glow backend is working",
  "status": "OK"
}
```

Статус: ✅ / ❌

---

## 2. Перевірка підключення до MySQL

### GET /db-test

```text
GET http://localhost:5000/api/db-test
```

Очікувано:

```json
{
  "message": "Database connection is working",
  "result": 2
}
```

Статус: ✅ / ❌

---

## 3. Auth: реєстрація користувача

### POST /auth/register

```text
POST http://localhost:5000/api/auth/register
```

Body:

```json
{
  "name": "User Test",
  "email": "user-test@gmail.com",
  "password": "123456"
}
```

Очікувано:

```text
User registered successfully
token повертається
role = user
```

Статус: ✅ / ❌

---

## 4. Auth: login користувача

### POST /auth/login

```text
POST http://localhost:5000/api/auth/login
```

Body:

```json
{
  "email": "user-test@gmail.com",
  "password": "123456"
}
```

Очікувано:

```text
Login successful
token повертається
role = user
```

Статус: ✅ / ❌

---

## 5. Auth: отримати поточного користувача

### GET /auth/me

```text
GET http://localhost:5000/api/auth/me
```

Headers:

```text
Authorization: Bearer USER_TOKEN
```

Очікувано:

```text
Повертається поточний користувач
```

Статус: ✅ / ❌

---

## 6. Auth: перевірка без token

### GET /auth/me без Authorization

Очікувано:

```json
{
  "message": "Authorization token is required"
}
```

Статус: ✅ / ❌

---

## 7. Services: отримати послуги

### GET /services

```text
GET http://localhost:5000/api/services
```

Очікувано:

```text
Повертається масив послуг
```

Статус: ✅ / ❌

---

## 8. Services: створити послугу без token

### POST /services

```text
POST http://localhost:5000/api/services
```

Body:

```json
{
  "title": "Тестова послуга",
  "description": "Опис тестової послуги"
}
```

Очікувано:

```json
{
  "message": "Authorization token is required"
}
```

Статус: ✅ / ❌

---

## 9. Services: створити послугу як user

### POST /services з USER_TOKEN

Очікувано:

```json
{
  "message": "Access denied. Admin role is required"
}
```

Статус: ✅ / ❌

---

## 10. Services: створити послугу як admin

### POST /services з ADMIN_TOKEN

```text
POST http://localhost:5000/api/services
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "title": "Тестова послуга",
  "description": "Опис тестової послуги"
}
```

Очікувано:

```text
Service created successfully
```

Статус: ✅ / ❌

---

## 11. Services: редагувати послугу як admin

### PUT /services/:id

```text
PUT http://localhost:5000/api/services/1
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "title": "Манікюр Lux",
  "description": "Оновлений опис послуги"
}
```

Очікувано:

```text
Service updated successfully
```

Статус: ✅ / ❌

---

## 12. Services: видалити тестову послугу як admin

### DELETE /services/:id

```text
DELETE http://localhost:5000/api/services/7
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Очікувано:

```text
Service deleted successfully
```

Статус: ✅ / ❌

---

## 13. Masters: отримати майстрів

### GET /masters

```text
GET http://localhost:5000/api/masters
```

Очікувано:

```text
Повертається масив майстрів
```

Статус: ✅ / ❌

---

## 14. Masters: створити майстра як admin

### POST /masters

```text
POST http://localhost:5000/api/masters
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "name": "Тестовий Майстер",
  "profession": "Тестова професія",
  "experience": "1 рік"
}
```

Очікувано:

```text
Master created successfully
```

Статус: ✅ / ❌

---

## 15. Masters: редагувати майстра як admin

### PUT /masters/:id

```text
PUT http://localhost:5000/api/masters/1
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "name": "Анна Коваль",
  "profession": "Топ-майстер манікюру",
  "experience": "6 років"
}
```

Очікувано:

```text
Master updated successfully
```

Статус: ✅ / ❌

---

## 16. Masters: видалити тестового майстра як admin

### DELETE /masters/:id

```text
DELETE http://localhost:5000/api/masters/6
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Очікувано:

```text
Master deleted successfully
```

Статус: ✅ / ❌

---

## 17. Appointments: створити запис гостем

### POST /appointments без token

```text
POST http://localhost:5000/api/appointments
```

Body:

```json
{
  "name": "Ірина",
  "phone": "+380991112233",
  "service_id": 1,
  "master_id": 1,
  "date": "2026-06-10",
  "time": "14:30",
  "comment": "Гостьовий тестовий запис"
}
```

Очікувано:

```text
Appointment created successfully
user_id = null
status = pending
```

Статус: ✅ / ❌

---

## 18. Appointments: створити запис як user

### POST /appointments з USER_TOKEN

```text
POST http://localhost:5000/api/appointments
```

Headers:

```text
Authorization: Bearer USER_TOKEN
```

Body:

```json
{
  "name": "User Test",
  "phone": "+380991234567",
  "service_id": 1,
  "master_id": 1,
  "date": "2026-06-11",
  "time": "16:00",
  "comment": "Запис авторизованого користувача"
}
```

Очікувано:

```text
Appointment created successfully
user_id не null
status = pending
```

Статус: ✅ / ❌

---

## 19. Appointments: мої записи як user

### GET /appointments/my

```text
GET http://localhost:5000/api/appointments/my
```

Headers:

```text
Authorization: Bearer USER_TOKEN
```

Очікувано:

```text
Повертаються тільки записи поточного користувача
```

Статус: ✅ / ❌

---

## 20. Appointments: всі записи як admin

### GET /appointments

```text
GET http://localhost:5000/api/appointments
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Очікувано:

```text
Повертаються всі записи
```

Статус: ✅ / ❌

---

## 21. Appointments: всі записи як user

### GET /appointments з USER_TOKEN

Очікувано:

```json
{
  "message": "Access denied. Admin role is required"
}
```

Статус: ✅ / ❌

---

## 22. Appointments: змінити статус як admin

### PUT /appointments/:id/status

```text
PUT http://localhost:5000/api/appointments/1/status
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "status": "confirmed"
}
```

Очікувано:

```text
Appointment status updated successfully
```

Статус: ✅ / ❌

---

## 23. Appointments: неправильний статус

### PUT /appointments/:id/status

Body:

```json
{
  "status": "done"
}
```

Очікувано:

```text
Invalid status
```

Статус: ✅ / ❌

---

## 24. Appointments: видалити запис як admin

### DELETE /appointments/:id

```text
DELETE http://localhost:5000/api/appointments/1
```

Headers:

```text
Authorization: Bearer ADMIN_TOKEN
```

Очікувано:

```text
Appointment deleted successfully
```

Статус: ✅ / ❌

---

## 25. Not Found route

### GET /api/unknown-route

```text
GET http://localhost:5000/api/unknown-route
```

Очікувано:

```json
{
  "message": "Route not found: GET /api/unknown-route"
}
```

Статус: ✅ / ❌

---

## Підсумок тестування

```text
Health check:                ✅ / ❌
Database connection:          ✅ / ❌
Auth register/login:          ✅ / ❌
JWT authMiddleware:           ✅ / ❌
Admin middleware:             ✅ / ❌
Services CRUD:                ✅ / ❌
Masters CRUD:                 ✅ / ❌
Appointments API:             ✅ / ❌
404 handler:                  ✅ / ❌
```

---

## Висновок

Якщо всі пункти пройдені успішно, backend готовий до підключення frontend-частини через fetch-запити замість localStorage.



3. Як правильно тестувати

Спочатку запусти backend:

```text
cd backend
npm run dev
```

Потім у Thunder Client зроби 2 login-запити:

Admin login
```text
POST http://localhost:5000/api/auth/login
```
Скопіюй token — це буде:
```text
ADMIN_TOKEN
```
User login
```text
POST http://localhost:5000/api/auth/login
```

Скопіюй token — це буде:

USER_TOKEN

У всіх protected-запитах вставляй:

Authorization: Bearer твій_token
4. Важливий нюанс з id

У чеклісті є приклади:

/services/1
/masters/1
/appointments/1

Але в тебе id може бути інший.

Перед PUT або DELETE спочатку зроби GET, подивись реальний id, і тільки потім використовуй його.