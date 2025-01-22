# E-commerce API

This is a backend API for an e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). The API provides endpoints for user authentication, product management, cart management, and order management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ecommerce-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ecommerce-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add your environment variables (see Environment Variables).
2. Start the server:
    ```sh
    npm start
    ```
3. The server will run on `http://localhost:5050` by default.

## API Endpoints

### Authentication

- **Register a new user**
    ```http
    POST /api/auth/register
    ```
- **Login a user**
    ```http
    POST /api/auth/login
    ```

### Users

- **Create a new user**
    ```http
    POST /api/users
    ```
- **Login a user**
    ```http
    POST /api/users/login
    ```

### Products

- **Get all products**
    ```http
    GET /api/products
    ```
- **Create a new product**
    ```http
    POST /api/products
    ```
- **Get a product by ID**
    ```http
    GET /api/products/:id
    ```
- **Update a product by ID**
    ```http
    PUT /api/products/:id
    ```
- **Delete a product by ID**
    ```http
    DELETE /api/products/:id
    ```

### Cart

- **Create a new cart**
    ```http
    POST /api/cart
    ```
- **Get all carts**
    ```http
    GET /api/cart
    ```
- **Get a cart by user ID**
    ```http
    GET /api/cart/:userId
    ```
- **Update a cart by ID**
    ```http
    PUT /api/cart/:id
    ```
- **Delete a cart by ID**
    ```http
    DELETE /api/cart/:id
    ```
- **Delete an item from a cart**
    ```http
    DELETE /api/cart/:cartId/item/:itemId
    ```
- **Update the status of a cart**
    ```http
    PUT /api/cart/:cartId/status
    ```

### Orders

- **Create a new order**
    ```http
    POST /api/orders
    ```
- **Get all orders**
    ```http
    GET /api/orders
    ```
- **Get an order by ID**
    ```http
    GET /api/orders/:id
    ```
- **Update an order by ID**
    ```http
    PUT /api/orders/:id
    ```
- **Delete an order by ID**
    ```http
    DELETE /api/orders/:id
    ```

## Environment Variables

Create a [.env](http://_vscodecontentref_/2) file in the root directory and add the following environment variables:

```env
ATLAS_URI=your_mongodb_connection_string
PORT=your_port_number
SECRET=your_jwt_secret