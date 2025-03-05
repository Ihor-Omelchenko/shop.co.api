# 🛒 Shop API (CRM) - Backend

🚀 Бекенд для управління користувачами в CRM. Використовує **Node.js, Express, MongoDB**.

---

## 🔗 **API Endpoints**

### 🟢 1. Аутентифікація (Auth)
#### **📌 1.1. Реєстрація користувача**
```http
    POST /api/auth/register
    Body (JSON):
    {
        "username": "newuser",
        "password": "mypassword"
    }
    Response:
    {
      "userId": "65aefc7d65f4d7b8c3e0a6a1",
      "message": "User registered successfully",
      "role": "guest"
    }
```

---

#### **📌 1.2. Логін користувача**
```
    POST /api/auth/login
    Body (JSON):
    {
      "username": "admin",
      "password": "adminpassword"
    }
    Response:
    {
      "token": "your_jwt_token",
      "role": "admin"
    }
```

---

### 🟠 2. Управління користувачами (Users)
#### Тільки для адміністраторів (role: "admin" або "superadmin")
#### **📌 2.1. Отримати список користувачів**
```
    GET /api/users?page=1&limit=10&role=guest&search=admin
    Response:
    {
      "users": [
        { "_id": "65aefc7d65f4d7b8c3e0a6a1", "username": "admin", "role": "admin" },
        { "_id": "65aefc7d65f4d7b8c3e0a6a2", "username": "user1", "role": "guest" }
      ],
      "totalUsers": 20,
      "currentPage": 1,
      "totalPages": 2
    }
```

---

#### **📌 2.2. Видалити користувача**
```
    DELETE /api/users/{userId}
    Response:
    {
      "message": "User deleted successfully"
    }
```
