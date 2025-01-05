
# Backend API Documentation

## Overview
This project provides a robust backend API for managing products and their associated images. The API offers the following functionalities:
- Add new products with multiple images.
- Retrieve products and their images with support for pagination.
- Store images in the database as Base64 and provide URLs for accessing them.
- Delete products along with their associated images.
- Return data such as total record count for better client-side management.
- Edit existing products

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
          "title": "Product",
          "images": [
              "https://{{your-url-address}}/images/6776a94bb988f7ea943c386c",
              "https://{{your-url-address}}/images/6776a94bb988f7ea943c386e"
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

### **3. Get Products List Routes**
#### Get All Products 
**GET** `/products`
- **Description**: Returns a list of products with the default value `page=1` `limit=10`

#### Get all products by pagination
**GET** `/products?page=1&limit=5`
- **Description**: Returns the list by pagination
  - **Response**:
    - **200 OK**:
      ```json
        {
            "products": [
                {...},
                {...},
                {...},
                {...},
                {...}
            ],
            "totalRecords": 10,
            "currentPage": 1,
            "totalPages": 2
        }
      ```
        - **404 Not Found**:
      ```json
        {
          "error": "Error fetching product"
        }
      ```
---

### **4. Delete Product**
#### Delete Product by id
**DELETE** `/deleteProduct/:id`
- **Description**: Deletes a product by its `_id` and all images assigned to it.

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

### **5. Edit Product**
#### Edit Product by id
**PUT** `/editProduct/:id`
- **Description**: Edit a product by its `_id`.
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
    - **200 OK**:
      ```json
        {
            "_id": "089254f7-e07d-4a32-9446-3c1e2b8bf4f5",
            "title": "Product 1.2",
            "images": [
              "https://{{your-url-address}}/images/677ac2225d68a3b2f71684ba"
            ],
            "price": 1000,
            "discount": 0,
            "category": "Сategory",
            "rating": 2.3,
            "quantity": 14,
            "timerEndsAt": 1735829801,
            "creationDate": 1735829801,
            "updateDate": 1735829801,
            "__v": 0
        }
      ```
        - **404 Not Found**:
      ```json
        {
          "error": "Failed to update product"
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

