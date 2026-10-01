const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Sample in-memory data. Data resets when the server restarts.
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 55000, quantity: 10 },
  { id: 2, name: 'Notebook', category: 'Stationery', price: 80, quantity: 100 },
  { id: 3, name: 'Headphones', category: 'Electronics', price: 2500, quantity: 25 }
];
let nextId = 4;

function validateProduct(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Request body must be a JSON object';
  }
  if (typeof body.name !== 'string' || body.name.trim() === '') {
    return 'name must be a non-empty string';
  }
  if (typeof body.category !== 'string' || body.category.trim() === '') {
    return 'category must be a non-empty string';
  }
  if (typeof body.price !== 'number' || !Number.isFinite(body.price) || body.price < 0) {
    return 'price must be a non-negative number';
  }
  if (!Number.isInteger(body.quantity) || body.quantity < 0) {
    return 'quantity must be a non-negative integer';
  }
  return null;
}

function getProductId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function editableFields(body) {
  return {
    name: body.name.trim(),
    category: body.category.trim(),
    price: body.price,
    quantity: body.quantity
  };
}

// GET /products - Return all products.
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/category/:category - Find products by category.
app.get('/products/category/:category', (req, res) => {
  const category = req.params.category.trim();
  if (!category) {
    return res.status(400).json({ error: 'Category must not be empty' });
  }

  const results = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  if (results.length === 0) {
    return res.status(404).json({ error: `No products found in category '${category}'` });
  }
  return res.json(results);
});

// GET /products/:id - Return one product by ID.
app.get('/products/:id', (req, res) => {
  const id = getProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Product ID must be a positive integer' });
  }
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ error: `Product with ID ${id} not found` });
  }
  return res.json(product);
});

// POST /products - Add a product. The API assigns the ID.
app.post('/products', (req, res) => {
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  const product = { id: nextId++, ...editableFields(req.body) };
  products.push(product);
  return res.status(201).json(product);
});

// PUT /products/:id - Update all editable fields of a product.
app.put('/products/:id', (req, res) => {
  const id = getProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Product ID must be a positive integer' });
  }
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Product with ID ${id} not found` });
  }

  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  products[index] = { id, ...editableFields(req.body) };
  return res.json(products[index]);
});

// DELETE /products/:id - Delete a product by ID.
app.delete('/products/:id', (req, res) => {
  const id = getProductId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Product ID must be a positive integer' });
  }
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Product with ID ${id} not found` });
  }

  const [deletedProduct] = products.splice(index, 1);
  return res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Return malformed JSON errors as JSON too.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Product API is running at http://localhost:${PORT}`);
  });
}

module.exports = app;
