

````md
# Soft Glow Frontend API Integration Notes

Цей файл описує, які частини frontend потрібно поступово перевести з localStorage на backend API.

Backend base URL:

```text
http://localhost:5000/api
````

---

## 1. Auth: Register

### Було на frontend

Користувачі зберігалися в localStorage:

```js
localStorage.setItem('users', JSON.stringify(users))
```

### Треба замінити на backend

Endpoint:

```text
POST /api/auth/register
```

### Fetch приклад

```js
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}

localStorage.setItem('currentUser', JSON.stringify(data.user))
localStorage.setItem('token', data.token)
```

---

## 2. Auth: Login

### Було на frontend

Користувач шукався в localStorage:

```js
const users = JSON.parse(localStorage.getItem('users')) || []
```

### Треба замінити на backend

Endpoint:

```text
POST /api/auth/login
```

### Fetch приклад

```js
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}

localStorage.setItem('currentUser', JSON.stringify(data.user))
localStorage.setItem('token', data.token)
```

---

## 3. Logout

### Було і може залишитися

При виході достатньо видаляти користувача і token:

```js
localStorage.removeItem('currentUser')
localStorage.removeItem('token')
```

---

## 4. Services: отримання послуг

### Було на frontend

Послуги бралися з масиву або localStorage.

### Треба замінити на backend

Endpoint:

```text
GET /api/services
```

### Fetch приклад

```js
const response = await fetch('http://localhost:5000/api/services')
const services = await response.json()
```

---

## 5. Services: створення послуги

### Access

Тільки admin.

Endpoint:

```text
POST /api/services
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch('http://localhost:5000/api/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: serviceData.title,
    description: serviceData.description,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 6. Services: редагування послуги

Endpoint:

```text
PUT /api/services/:id
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: serviceData.title,
    description: serviceData.description,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 7. Services: видалення послуги

Endpoint:

```text
DELETE /api/services/:id
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 8. Masters: отримання майстрів

Endpoint:

```text
GET /api/masters
```

### Fetch приклад

```js
const response = await fetch('http://localhost:5000/api/masters')
const masters = await response.json()
```

---

## 9. Masters: створення майстра

Endpoint:

```text
POST /api/masters
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch('http://localhost:5000/api/masters', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: masterData.name,
    profession: masterData.profession,
    experience: masterData.experience,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 10. Masters: редагування майстра

Endpoint:

```text
PUT /api/masters/:id
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/masters/${masterId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: masterData.name,
    profession: masterData.profession,
    experience: masterData.experience,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 11. Masters: видалення майстра

Endpoint:

```text
DELETE /api/masters/:id
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/masters/${masterId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 12. Appointments: створення запису гостем

Endpoint:

```text
POST /api/appointments
```

### Fetch приклад

```js
const response = await fetch('http://localhost:5000/api/appointments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    service_id: formData.service_id,
    master_id: formData.master_id,
    date: formData.date,
    time: formData.time,
    comment: formData.comment,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 13. Appointments: створення запису авторизованим користувачем

Endpoint той самий:

```text
POST /api/appointments
```

Але додається token.

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch('http://localhost:5000/api/appointments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    service_id: formData.service_id,
    master_id: formData.master_id,
    date: formData.date,
    time: formData.time,
    comment: formData.comment,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 14. Appointments: Мої записи

Endpoint:

```text
GET /api/appointments/my
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch('http://localhost:5000/api/appointments/my', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const appointments = await response.json()
```

---

## 15. Appointments: усі записи для адміна

Endpoint:

```text
GET /api/appointments
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch('http://localhost:5000/api/appointments', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const appointments = await response.json()
```

---

## 16. Appointments: зміна статусу

Endpoint:

```text
PUT /api/appointments/:id/status
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    status: newStatus,
  }),
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 17. Appointments: видалення запису

Endpoint:

```text
DELETE /api/appointments/:id
```

### Fetch приклад

```js
const token = localStorage.getItem('token')

const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const data = await response.json()

if (!response.ok) {
  alert(data.message)
  return
}
```

---

## 18. Що поступово прибираємо з frontend

Поступово треба прибрати залежність від:

```js
localStorage.getItem('users')
localStorage.setItem('users', ...)
localStorage.getItem('appointments')
localStorage.setItem('appointments', ...)
localStorage.getItem('services')
localStorage.setItem('services', ...)
localStorage.getItem('masters')
localStorage.setItem('masters', ...)
```

Але поки можна залишити:

```js
localStorage.getItem('currentUser')
localStorage.setItem('currentUser', ...)
localStorage.getItem('token')
localStorage.setItem('token', ...)
```

Тому що frontend має десь тимчасово зберігати інформацію про залогіненого користувача і JWT token.

---

## 19. Рекомендований порядок підключення frontend

1. Підключити Login/Register до backend.
2. Зберігати token після входу.
3. Підключити список services через GET /api/services.
4. Підключити список masters через GET /api/masters.
5. Підключити BookingPage через POST /api/appointments.
6. Підключити MyAppointments через GET /api/appointments/my.
7. Підключити Admin appointments через GET /api/appointments.
8. Підключити зміну статусу запису.
9. Підключити видалення запису.
10. Підключити admin services CRUD.
11. Підключити admin masters CRUD.

---

## 20. Важливий нюанс

Frontend зараз може мати поля:

```js
service
master
date
time
```

Backend очікує:

```js
service_id
master_id
date
time
```

Тому при підключенні BookingPage треба переконатися, що з форми відправляються саме id послуги та майстра, а не тільки їх назви.


# 3. Для чого цей файл

Це “карта переходу”:

```text
localStorage logic → backend API logic
````


