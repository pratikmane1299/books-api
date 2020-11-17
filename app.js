const express = require('express');
require('dotenv').config();

const booksRouter = require('./routes/books');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'HELLO WORLD :)',
  })
});

app.use('/api/v1/books', booksRouter);

module.exports = app;
