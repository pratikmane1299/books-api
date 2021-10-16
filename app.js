const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express')

const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genre');
const publisherRouter = require('./routes/publisher');
const authorRouter = require('./routes/author');

const swaggerFile = require('./swagger_output.json')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'HELLO WORLD :)',
  })
});

app.use('/api/v1/books', booksRouter);
app.use('/api/v1/genres', genresRouter);
app.use('/api/v1/publishers', publisherRouter);
app.use('/api/v1/authors', authorRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(notFound);
app.use(errorHandler);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    err.status = 400;
    let errors = {};
    err.inner.forEach((e) => {
      errors = {
        ...errors,
        [e.path]: e.message
      };
    });
    err.validationErrors = errors;
  }
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }

  res.json({
    message: err.message,
    error: err,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = app;
