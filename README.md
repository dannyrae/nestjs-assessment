# Grocery Delivery API

A simple RESTful API for a grocery delivery service built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/).

## Features

- Add, update, delete, and retrieve grocery items
- User authentication with JWT (no Passport)
- Protected routes for managing groceries
- Request validation and error handling
- MongoDB for persistent storage
- Basic test coverage with Jest

## Requirements

- Node.js v18+
- pnpm
- MongoDB

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
dev: pnpm start:dev
# or
prod: pnpm build && pnpm start:prod
```

## API Endpoints

### Auth
- `POST /auth/register` – Create a new user
- `POST /auth/login` – Login and get a JWT

### Groceries (protected)
Include `Authorization: Bearer <token>` in headers

- `GET /groceries` – Get all grocery items
- `POST /groceries` – Add a grocery item
- `PATCH /groceries/:id` – Update a grocery item
- `DELETE /groceries/:id` – Delete a grocery item

## Testing

```bash
pnpm test
```

## License

MIT
