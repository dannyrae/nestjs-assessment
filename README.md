# Grocery Delivery API

A simple RESTful API for a grocery delivery service built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/).

## Features

* User authentication with JWT (without Passport)
* Add, update, delete, and retrieve grocery items
* Add, update, delete, and view cart items
* Protected routes for authorized access
* Request validation and error handling
* MongoDB for persistent storage
* Basic test coverage with Jest

## Requirements

* Node.js v18+
* pnpm
* MongoDB

## Installation

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/grocery
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Running the App

```bash
# Start the app
pnpm start:dev

# For production
pnpm build && pnpm start:prod
```

## API Endpoints

### Auth

#### `POST /auth/signup`

Create a new user

**Body Parameters**:

```json
{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

#### `POST /auth/signin`

Login and receive a JWT

**Body Parameters** (login with either email or username):

```json
{
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

*or*

```json
{
  "username": "johnsmith",
  "password": "StrongPass123!"
}
```

---

### Groceries (Protected)

> Include `Authorization: Bearer <token>` in the request headers.

#### `GET /groceries`

Get all grocery items

#### `POST /groceries`

Add a grocery item

**Body Parameters**:

```json
{
  "name": "Milk",
  "price": 3.5
}
```

#### `GET /groceries/:id`

Get a specific grocery item

#### `PATCH /groceries/:id`

Update a grocery item

**Body Parameters**:

```json
{
  "price": 4.0
}
```

#### `DELETE /groceries/:id`

Delete a grocery item

---

### Cart (Protected)

> Include `Authorization: Bearer <token>` in the request headers.

#### `POST /cart`

Add an item to cart

**Body Parameters**:

```json
{
  "grocery": "60f5c9d123456789abcdef12",
  "quantity": 2
}
```

#### `GET /cart`

Get all cart instances for the user

#### `GET /cart/:cartId`

Get a specific cart instance

#### `PATCH /cart/:cartId`

Update item quantity in cart

**Body Parameters**:

```json
{
  "quantity": 3
}
```

#### `DELETE /cart/:cartId`

Remove an item from cart

---

## Testing

```bash
pnpm test
```

## License

MIT
