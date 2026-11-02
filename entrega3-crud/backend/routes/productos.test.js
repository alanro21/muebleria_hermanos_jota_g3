const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { router } = require('./productos');

const app = express();
app.use(express.json());
app.use('/api/productos', router);

let server;
let baseUrl;
let readyState;

before(async () => {
  readyState = mongoose.connection.readyState;
  mongoose.connection.readyState = 1;
  server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/api/productos`;
});

after(async () => {
  mongoose.connection.readyState = readyState;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET routes return products from Mongoose and reject malformed IDs', async () => {
  const id = '507f1f77bcf86cd799439011';
  const originalFind = Product.find;
  const originalFindById = Product.findById;

  Product.find = async () => [{ _id: id, nombre: 'Mesa', precio: 120, stock: 3 }];
  Product.findById = async (receivedId) => (
    receivedId === id ? { _id: id, nombre: 'Mesa', precio: 120, stock: 3 } : null
  );

  try {
    const listResponse = await fetch(baseUrl);
    assert.equal(listResponse.status, 200);
    assert.equal((await listResponse.json())[0].id, id);

    const itemResponse = await fetch(`${baseUrl}/${id}`);
    assert.equal(itemResponse.status, 200);
    assert.equal((await itemResponse.json())._id, id);

    const invalidResponse = await fetch(`${baseUrl}/not-an-object-id`);
    assert.equal(invalidResponse.status, 400);
    assert.match((await invalidResponse.json()).error, /identificador/i);
  } finally {
    Product.find = originalFind;
    Product.findById = originalFindById;
  }
});

test('POST creates a document with only the supported product fields', async () => {
  const id = '507f1f77bcf86cd799439011';
  const originalCreate = Product.create;
  let createdData;

  Product.create = async (data) => {
    createdData = data;
    return { _id: id, ...data };
  };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Mesa',
        descripcion: 'Madera',
        precio: '120',
        stock: '3',
        imagenUrl: '/mesa.jpg',
        categoria: 'Mesas',
      }),
    });

    assert.equal(response.status, 201);
    assert.equal((await response.json()).id, id);
    assert.deepEqual(createdData, {
      nombre: 'Mesa',
      descripcion: 'Madera',
      precio: 120,
      stock: 3,
      imagenUrl: '/mesa.jpg',
    });
  } finally {
    Product.create = originalCreate;
  }
});

test('PUT persists fields through findByIdAndUpdate and returns the saved document', async () => {
  const id = '507f1f77bcf86cd799439011';
  const originalUpdate = Product.findByIdAndUpdate;
  let updateArgs;

  Product.findByIdAndUpdate = async (...args) => {
    updateArgs = args;
    return { _id: id, ...args[1] };
  };

  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'Mesa nueva', precio: 180, stock: 4 }),
    });

    assert.equal(response.status, 200);
    assert.equal((await response.json()).nombre, 'Mesa nueva');
    assert.deepEqual(updateArgs, [
      id,
      { nombre: 'Mesa nueva', precio: 180, stock: 4 },
      { new: true, runValidators: true },
    ]);
  } finally {
    Product.findByIdAndUpdate = originalUpdate;
  }
});

test('DELETE removes a document through findByIdAndDelete', async () => {
  const id = '507f1f77bcf86cd799439011';
  const originalDelete = Product.findByIdAndDelete;
  let deletedId;

  Product.findByIdAndDelete = async (receivedId) => {
    deletedId = receivedId;
    return { _id: id };
  };

  try {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    assert.equal(response.status, 200);
    assert.equal(deletedId, id);
    assert.equal((await response.json()).id, id);
  } finally {
    Product.findByIdAndDelete = originalDelete;
  }
});

test('PUT and DELETE report invalid input and missing products with the correct status', async () => {
  const originalUpdate = Product.findByIdAndUpdate;
  const originalDelete = Product.findByIdAndDelete;

  Product.findByIdAndUpdate = async () => null;
  Product.findByIdAndDelete = async () => null;

  try {
    const invalidIdResponse = await fetch(`${baseUrl}/invalid-id`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'Mesa' }),
    });
    assert.equal(invalidIdResponse.status, 400);

    const invalidStockResponse = await fetch(`${baseUrl}/507f1f77bcf86cd799439011`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: -1 }),
    });
    assert.equal(invalidStockResponse.status, 400);

    const missingUpdateResponse = await fetch(`${baseUrl}/507f1f77bcf86cd799439011`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'Mesa' }),
    });
    assert.equal(missingUpdateResponse.status, 404);

    const missingDeleteResponse = await fetch(`${baseUrl}/507f1f77bcf86cd799439011`, {
      method: 'DELETE',
    });
    assert.equal(missingDeleteResponse.status, 404);
  } finally {
    Product.findByIdAndUpdate = originalUpdate;
    Product.findByIdAndDelete = originalDelete;
  }
});

test('CRUD returns 503 instead of reporting in-memory success without MongoDB', async () => {
  mongoose.connection.readyState = 0;

  const getResponse = await fetch(baseUrl);
  const updateResponse = await fetch(`${baseUrl}/507f1f77bcf86cd799439011`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: 'No persistir' }),
  });
  const deleteResponse = await fetch(`${baseUrl}/507f1f77bcf86cd799439011`, {
    method: 'DELETE',
  });

  assert.equal(getResponse.status, 503);
  assert.equal(updateResponse.status, 503);
  assert.equal(deleteResponse.status, 503);
});
