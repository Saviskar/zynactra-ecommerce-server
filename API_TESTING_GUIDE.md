# Postman API Testing Guide

This guide will help you test the endpoints of your Node.js REST API using Postman. 

## 1. Prerequisites & Server Setup

Before testing with Postman, make sure your local server is running properly.

1. **Environment Variables**: Ensure your `.env` file is properly configured with your PostgreSQL details. (Note: Make sure your database named `Zynactra Server` or `ecommerce` exists in PostgreSQL).
2. **Start the Server**: Open your terminal in the `server` directory and run:
   ```bash
   npm run dev
   ```
   *The server should start on `http://localhost:3000`.*

---

## 2. Setting up Postman

1. Open Postman and create a new **Collection** (e.g., "E-commerce API").
2. For each of the endpoints below, create a new **Request** inside your collection.
3. For endpoints that require a JSON body, go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown menu.

---

## 3. API Endpoints

### 3.1 Authentication

#### Register a New User
- **URL**: `http://localhost:3000/api/auth/register`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "password": "securepassword123"
  }
  ```
- **Expected Result**: A success response indicating the user was created.

#### Login
- **URL**: `http://localhost:3000/api/auth/login`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
      "email": "jane.doe@example.com",
      "password": "securepassword123"
  }
  ```
- **Expected Result**: Should return a success response containing a JWT token. 
> [!IMPORTANT]
> **Copy the returned token**, you will need it for the authenticated requests below!

---

### 3.2 Products

#### Get All Products
- **URL**: `http://localhost:3000/api/products`
- **Method**: `GET`
- **Body**: *None*
- **Expected Result**: A JSON array of all available products. Note the `id` of a product to use in the checkout step.

---

### 3.3 Orders (Requires Authentication)

#### Checkout (Place an Order)
- **URL**: `http://localhost:3000/api/orders/checkout`
- **Method**: `POST`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer <YOUR_JWT_TOKEN>` *(Replace with the token you got from Login)*
- **Body** (JSON):
  ```json
  {
      "items": [
          {
              "product_id": 1,
              "quantity": 2
          },
          {
              "product_id": 3,
              "quantity": 1
          }
      ]
  }
  ```
- **Expected Result**: A success response indicating the order was placed successfully.

---

## 4. Troubleshooting Local Issues

During an initial check of your codebase, I noticed that the server `.env` file has `DB_HOST=127.0.0.1` and `DB_NAME=Zynactra Server`. 
If your server hangs or crashes on startup (`npm run dev`), please double-check:
1. That your PostgreSQL service is running.
2. The database `Zynactra Server` exists (or change `DB_NAME` to `ecommerce` as per your `.env.example`).
3. Your `DB_PASSWORD` is correct for the `postgres` user.
