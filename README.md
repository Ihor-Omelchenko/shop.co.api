# 🛒 Shop API (CRM) - Backend

🚀 Backend для управління CRM.

---

## **API Endpoints**

### 1. Authentication (Auth)

#### **📌 1.1. Registering a new administrator**

##### For administrators only (role: “superAdmin”)

```http
    POST /api/auth/register
    Body (JSON):
    {
        "adminName": "New.Admin",
        "password": "*******"
    }
    Response:
    {
      "adminId": "65aefc7d65f4d7b8c3e0a6a1",
      "message": "Admin registered successfully",
      "role": "guest"
    }
```

---

#### **📌 1.2. Administrator login**

```
    POST /api/auth/login
    Body (JSON):
    {
      "adminName": "New.Admin",
      "password": "*******"
    }
    Response:
    {
      "accessToken": "generated accessToken (valid for 15 minutes)",
      "refreshToken": "generated refreshToken (valid for 24 hours)"
    }
```

---

### 2. Management of administrators (Admins)

#### **📌 2.1. Get the list of administrators**

```
    GET /api/admins?page=1&limit=10&role=guest&search=admin
    Response:
    {
      "users": [
        { "_id": "65aefc7d65f4d7b8c3e0a6a1", "adminName": "admin", "role": "admin", "createdAt": "2025-03-15T22:37:10.258Z", "updatedAt": "2025-03-15T22:37:10.258Z", "__v": 0 },
        { "_id": "65aefc7d65f4d7b8c3e0a6a2", "adminName": "user1", "role": "guest", "createdAt": "2025-03-15T22:37:10.258Z", "updatedAt": "2025-03-15T22:37:10.258Z", "__v": 0 }
      ],
      "totalUAdmins": 20,
      "currentPage": 1,
      "totalPages": 2
    }
```

---

#### **📌 2.2. Remove the administrator**

#### For administrators only (role: “superAdmin”)

```
    POST /api/admins/remove
     Body (JSON):
    {
      "id": "67dddaccefb408da96cafe02"
    }
    Response:
    {
      "message": "Admin deleted successfully"
    }
```

---

### 3. Manage images

#### **📌 3.1. Get image id**

```
    POST /api/images/upload
     Body (form-data):
    {
      "image": "image.png" (file)
    }
    Response:
    {
        "fileId": "67dddcbdd1d12ee50a2fb14d"
    }
```

---

#### **📌 3.2. Get the image**

```
    GET /api/images/:id
    Response: (image)
```

---

### 4. Product management

#### **📌 4.1. Get the list of products**

```
    GET /api/products?page=2&limit=4&search=shoes&minPrice=20&maxPrice=200
    Response:
    {
        "totalProduct":2,
        "totalPages":1,
        "currentPage":1,
        "products":[
            {   
                "_id":"67dddcced1d12ee50a2fb150",
                "title":"T-shirt_1",
                "description":"Black cotton T-shirt",
                "price":29.99,
                "imageUrl":"/api/images/67dddcbdd1d12ee50a2fb14d",
                "createdAt":"2025-03-21T21:40:30.616Z",
                "updatedAt":"2025-03-21T21:40:30.616Z",
                "__v":0
            },
            {
                "_id":"67dddae4efb408da96cafe06",
                "title":"T-shirt_2",
                "description":"Black cotton T-shirt",
                "price":29.99,"imageUrl":"/api/images/67dddaddefb408da96cafe04",
                "createdAt":"2025-03-21T21:32:20.635Z",
                "updatedAt":"2025-03-21T21:32:20.635Z",
                "__v":0
            }
        ]
    }
```

---

#### **📌 4.2. Creating a new product**

##### For administrators only (role: “admin or superAdmin”)

```
    POST /api/products/addProduct
     Body (JSON):
    {
        "title": "T-shirt_1",
        "description": "Black cotton T-shirt",
        "price": 29.99,
        "imageId": "67dddcbdd1d12ee50a2fb14d"
    }
    Response:
    {
        "title": "T-shirt_1",
        "description": "Black cotton T-shirt",
        "price": 29.99,
        "imageUrl": "/api/images/67dddcbdd1d12ee50a2fb14d",
        "_id": "67dddcced1d12ee50a2fb150",
        "createdAt": "2025-03-21T21:40:30.616Z",
        "updatedAt": "2025-03-21T21:40:30.616Z",
        "__v": 0
    }
```

---

#### **📌 4.3. Deleting a product by Id**

##### For administrators only (role: “admin or superAdmin”)

```
    POST /api/products/remove
     Body (JSON):
    {
        "productId": "67dddaccefb408da96cafe02"
    }
    Response:
    {
        "message": "Product and image successfully deleted"
    }
```
