# Product Management REST API

REST API assignment built with Node.js and Express.js. Product data has `id`, `name`, `category`, `price`, and `quantity`. IDs are assigned by the API. The sample data is stored in memory and resets when the server restarts.

## Run in VS Code

1. Open this folder in VS Code.
2. Open the VS Code terminal (**Terminal → New Terminal**).
3. Run `npm install` once.
4. Run `npm start`.
5. Open `http://localhost:3000/products` in a browser, or use the examples below.

## API routes

| Method | Endpoint | Operation |
| --- | --- | --- |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get one product by ID |
| POST | `/products` | Add a product |
| PUT | `/products/:id` | Update a product (send all editable fields) |
| DELETE | `/products/:id` | Delete a product |
| GET | `/products/category/:category` | Get products in a category |

POST and PUT expect JSON with all editable fields, for example:

```json
{
  "name": "Mouse",
  "category": "Electronics",
  "price": 700,
  "quantity": 20
}
```

The API validates the data and returns specific `400` or `404` JSON error messages when input is invalid or a product ID/category is not found.