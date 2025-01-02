
# Backend API Documentation

## Overview
This project provides a backend API for managing products and their associated images. The API allows clients to:
- Add new products with multiple images.
- Retrieve products and their images.
- Store images in the database as Base64 and provide URLs for accessing them.

---

## Requirements

### Prerequisites
- Node.js (v22.9 or newer)
- MongoDB (Atlas or Local instance)

### Dependencies
The following dependencies are used in this project:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `multer` - Middleware for handling file uploads
- `dotenv` - For environment variable management
- `cors` - For enabling Cross-Origin Resource Sharing
- `uuid` - For creating a unique identifier

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
        - `title`: (String) Title of the product.
        - `images`: (File) One or more images of the product.
        - `price`: (Number) Price of the product.
        - `category`: (String) Category of the product.
        - `discount`: (Number) Discount applied to the product
        - `rating`: (Number) Price of the product
        - `quantity`: (Number) Quantity of the product available
        - `timerEndsAt`: (Number) Timestamp indicating when the timer ends
        - `creationDate`: (Number) Timestamp when the product was created
        - `updateDate`: (Number) Timestamp of the last update to the product
       

- **Response**:
    - **201 Created**:
        ```json
        {
          "_id": "83b1ad9f-b709-4177-a47e-fdc99dcf5fc8",
          "title": "52wsefwe",
          "images": [
          "https://shop-co-api.vercel.app/images/6776a94bb988f7ea943c386c",
          "https://shop-co-api.vercel.app/images/6776a94bb988f7ea943c386e"
          ],
          "price": 50,
          "discount": 0,
          "category": "category",
          "rating": 4,
          "quantity": 55,
          "timerEndsAt": 1735829801,
          "creationDate": 1735829801,
          "updateDate": 1735829801,
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

### **4. Delete Product**

#### Delete Product by id
**DELETE** `/deleteProduct/:id`
- Deletes a product by its `_id` and all images assigned to it.

  - **Response**:
    - **200 OK**: 
      ```json
        {
            "message": "Product and associated images deleted successfully."
        }
      ```
      - **404 Not Found**: 
      ```json
        {
          "error": "Product not found"
        }
      ```
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

