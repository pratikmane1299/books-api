const express = require('express');

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await db.select('*').from('books');
  
  res.json(books);
});

router.get('/:id', async (req, res) => {

  const { id } = req.params;

  const book = await db.select('*').from('books').where('id', '=' , id).first();

  if (!book) {
    return res.status(404).json({ message: `Book with id ${id} not found.`})
  }
  
  res.json(book);
});

router.post('/', async (req, res) => {
  const book = req.body;

  const newBook = await db('books').insert(book).returning('*');

  res.json(newBook[0]);
});

module.exports = router;
