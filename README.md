
# Backend API Documentation

## Overview
This project provides a backend API for managing products and their associated images. The API allows clients to:
- Add new products with multiple images.
- Retrieve products and their images.
- Store images in the database as Base64 and provide URLs for accessing them.

---

## Requirements

### Prerequisites
- Node.js (v20 or newer)
- MongoDB (Atlas or Local instance)

### Dependencies
The following dependencies are used in this project:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `multer` - Middleware for handling file uploads
- `dotenv` - For environment variable management
- `cors` - For enabling Cross-Origin Resource Sharing

---

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGO_URI=<your_mongo_db_connection_string>
    BASE_URL=http://localhost:3000
    PORT=3000
    ```

4. Start the server:
    ```bash
    node index.js
    ```
   By default, the server runs on `http://localhost:3000`.

---

## API Endpoints

### **1. Add a Product**
**POST** `/addProduct`

- **Description**: Adds a new product with associated images.
- **Request Body**:
    - Form-data:
        - `_id`: (String) Unique identifier for the product.
        - `title`: (String) Title of the product.
        - `images`: (File) One or more images of the product.
        - `price`: (Number) Price of the product.
        - `category`: (String) Category of the product.
        - `discount`: (Number)
        - `rating`: (Number)
        - `quantity`: (Number)
        - `timerEndsAt`: (Number)
        - `creationDate`: (Number)
        - `updateDate`: (Number)
       

- **Response**:
    - **201 Created**:
        ```json
        {
          "_id": "1",
          "title": "Test Product",
          "images": [
            "http://localhost:3000/images/64e5b4f5d6f8e12345",
            "http://localhost:3000/images/64e5b4f6d6f8e12346"
          ],
          "price": 100,
          "category": "Electronics",
          "discount": 10,
          "rating": 4,
          "quantity": 422,
          "timerEndsAt": 1111111111,
          "creationDate": 1111111111,
          "updateDate": 1111111111,
          "__v": 0
        }
        ```

    - **400 Bad Request**: Missing required fields.
    - **409 Conflict**: Product with the given `_id` already exists.

---

### **2. Get Product Image**
**GET** `/images/:id`

- **Description**: Retrieves a product image by its unique ID.
- **URL Parameters**:
    - `id`: The ID of the image.

- **Response**:
    - **200 OK**: Returns the image as a `jpeg` file.
    - **404 Not Found**: If the image does not exist.

---

### **3. Additional Routes**

#### Get All Products
**GET** `/products`
- Returns a list of all products.
---

## Database Structure

### Products Collection
| Field         | Type    | Description                                 |
|---------------|---------|---------------------------------------------|
| `_id`         | String  | Unique identifier for the product           |
| `title`       | String  | Title of the product                        |
| `images`      | Array   | Array of image URLs                         |
| `price`       | Number  | Price of the product                        |
| `discount`    | Number  | Discount applied to the product             |
| `category`    | String  | Category of the product                     |
| `rating`      | Number  | Average rating of the product               |
| `quantity`    | Number  | Quantity of the product available           |
| `timerEndsAt` | Number  | Timestamp indicating when the timer ends    |
| `creationDate`| Number  | Timestamp when the product was created      |
| `updateDate`  | Number  | Timestamp of the last update to the product |

### Images Collection
| Field       | Type    | Description                      |
|-------------|---------|----------------------------------|
| `_id`       | String  | Unique identifier for the image  |
| `productId` | String  | ID of the associated product     |
| `imageData` | String  | Base64-encoded image data        |
| `fileName`  | String  | Original file name               |

---

## Error Handling
- **400 Bad Request**: Missing or invalid data in the request.
- **404 Not Found**: Resource does not exist (e.g., product or image).
- **500 Internal Server Error**: Unexpected server error.

