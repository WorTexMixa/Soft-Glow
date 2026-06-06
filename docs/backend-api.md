# Soft Glow Backend API Documentation

Backend API для веб-орієнтованої інформаційної системи управління діяльністю салону краси Soft Glow.

## Base URL

```text
http://localhost:5000/api
````

---

## 1. Health Check

### GET /health

Перевірка роботи backend-сервера.

#### Response

```json
{
  "message": "Soft Glow backend is working",
  "status": "OK"
}
```

---

## 2. Database Test

### GET /db-test

Перевірка підключення backend до MySQL.

#### Response

```json
{
  "message": "Database connection is working",
  "result": 2
}
```

---

## 3. Auth

### POST /auth/register

Реєстрація нового користувача.

#### Access

Публічний endpoint.

#### Body

```json
{
  "name": "Микита",
  "email": "test@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Микита",
    "email": "test@gmail.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

---

### POST /auth/login

Вхід користувача в систему.

#### Access

Публічний endpoint.

#### Body

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

#### Response

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Микита",
    "email": "test@gmail.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

---

### GET /auth/me

Отримання інформації про поточного користувача.

#### Access

Тільки авторизований користувач.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
{
  "user": {
    "id": 1,
    "name": "Микита",
    "email": "test@gmail.com",
    "role": "user"
  }
}
```

---

## 4. Services

### GET /services

Отримання списку послуг.

#### Access

Публічний endpoint.

#### Response

```json
[
  {
    "id": 1,
    "title": "Манікюр",
    "description": "Догляд за нігтями та покриття гель-лаком",
    "created_at": "2026-06-05T10:00:00.000Z"
  }
]
```

---

### POST /services

Створення нової послуги.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "title": "Педикюр",
  "description": "Комплексний догляд за стопами та нігтями"
}
```

#### Response

```json
{
  "message": "Service created successfully",
  "service": {
    "id": 2,
    "title": "Педикюр",
    "description": "Комплексний догляд за стопами та нігтями"
  }
}
```

---

### PUT /services/:id

Редагування послуги.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "title": "Манікюр Lux",
  "description": "Манікюр з покриттям та доглядом"
}
```

#### Response

```json
{
  "message": "Service updated successfully",
  "service": {
    "id": 1,
    "title": "Манікюр Lux",
    "description": "Манікюр з покриттям та доглядом"
  }
}
```

---

### DELETE /services/:id

Видалення послуги.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
{
  "message": "Service deleted successfully",
  "deletedServiceId": 1
}
```

---

## 5. Masters

### GET /masters

Отримання списку майстрів.

#### Access

Публічний endpoint.

#### Response

```json
[
  {
    "id": 1,
    "name": "Анна Коваль",
    "profession": "Майстер манікюру",
    "experience": "5 років",
    "created_at": "2026-06-05T10:00:00.000Z"
  }
]
```

---

### POST /masters

Створення нового майстра.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "name": "Олена Шевченко",
  "profession": "Перукар-стиліст",
  "experience": "6 років"
}
```

#### Response

```json
{
  "message": "Master created successfully",
  "master": {
    "id": 2,
    "name": "Олена Шевченко",
    "profession": "Перукар-стиліст",
    "experience": "6 років"
  }
}
```

---

### PUT /masters/:id

Редагування майстра.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "name": "Олена Шевченко",
  "profession": "Топ-перукар",
  "experience": "7 років"
}
```

#### Response

```json
{
  "message": "Master updated successfully",
  "master": {
    "id": 2,
    "name": "Олена Шевченко",
    "profession": "Топ-перукар",
    "experience": "7 років"
  }
}
```

---

### DELETE /masters/:id

Видалення майстра.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
{
  "message": "Master deleted successfully",
  "deletedMasterId": 2
}
```

---

## 6. Appointments

### POST /appointments

Створення запису до салону.

#### Access

Публічний endpoint.

Може працювати:

* без token — запис створюється як гостьовий;
* з token — запис прив’язується до авторизованого користувача через user_id.

#### Optional Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "name": "Ірина",
  "phone": "+380991112233",
  "service_id": 1,
  "master_id": 1,
  "date": "2026-06-10",
  "time": "14:30",
  "comment": "Хочу вечірній час, якщо буде можливість"
}
```

#### Response

```json
{
  "message": "Appointment created successfully",
  "appointment": {
    "id": 1,
    "name": "Ірина",
    "phone": "+380991112233",
    "service_id": 1,
    "master_id": 1,
    "date": "2026-06-10",
    "time": "14:30",
    "comment": "Хочу вечірній час, якщо буде можливість",
    "status": "pending",
    "user_id": null
  }
}
```

---

### GET /appointments

Отримання всіх записів.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
[
  {
    "id": 1,
    "name": "Ірина",
    "phone": "+380991112233",
    "service_id": 1,
    "service_title": "Манікюр",
    "master_id": 1,
    "master_name": "Анна Коваль",
    "master_profession": "Майстер манікюру",
    "date": "2026-06-10",
    "time": "14:30",
    "comment": "Хочу вечірній час, якщо буде можливість",
    "status": "pending",
    "user_id": null,
    "user_name": null,
    "user_email": null,
    "created_at": "2026-06-05T10:00:00.000Z"
  }
]
```

---

### GET /appointments/my

Отримання записів поточного користувача.

#### Access

Тільки авторизований користувач.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
[
  {
    "id": 2,
    "name": "Микита",
    "phone": "+380991234567",
    "service_id": 1,
    "service_title": "Манікюр",
    "master_id": 1,
    "master_name": "Анна Коваль",
    "master_profession": "Майстер манікюру",
    "date": "2026-06-11",
    "time": "16:00",
    "comment": "Запис від зареєстрованого користувача",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-06-05T10:00:00.000Z"
  }
]
```

---

### PUT /appointments/:id/status

Зміна статусу запису.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Body

```json
{
  "status": "confirmed"
}
```

#### Allowed statuses

```text
pending
confirmed
cancelled
completed
```

#### Response

```json
{
  "message": "Appointment status updated successfully",
  "appointment": {
    "id": 1,
    "status": "confirmed"
  }
}
```

---

### DELETE /appointments/:id

Видалення запису.

#### Access

Тільки admin.

#### Headers

```text
Authorization: Bearer jwt_token
```

#### Response

```json
{
  "message": "Appointment deleted successfully",
  "deletedAppointmentId": 1
}
```

---

## 7. Authorization rules

У системі використовуються ролі:

```text
user
admin
```

### Public endpoints

```text
GET  /api/health
GET  /api/db-test
POST /api/auth/register
POST /api/auth/login
GET  /api/services
GET  /api/masters
POST /api/appointments
```

### User endpoints

```text
GET /api/auth/me
GET /api/appointments/my
```

### Admin endpoints

```text
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id

POST   /api/masters
PUT    /api/masters/:id
DELETE /api/masters/:id

GET    /api/appointments
PUT    /api/appointments/:id/status
DELETE /api/appointments/:id
```

---

## 8. Common error responses

### Route not found

```json
{
  "message": "Route not found: GET /api/unknown-route"
}
```

### Authorization token is required

```json
{
  "message": "Authorization token is required"
}
```

### Access denied

```json
{
  "message": "Access denied. Admin role is required"
}
```

### Invalid email or password

```json
{
  "message": "Invalid email or password"
}
```

### Validation error

```json
{
  "message": "Name, phone, service, master, date and time are required"
}
```



# 4. Що зафіксовано в документації

У цьому файлі  описано:

```text
1. Auth endpoints
2. Services endpoints
3. Masters endpoints
4. Appointments endpoints
5. Права доступу
6. JWT headers
7. Приклади JSON body
8. Типові помилки
```
