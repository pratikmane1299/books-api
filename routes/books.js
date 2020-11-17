const express = require('express');

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await db.select('*').from('books');
  
  res.json(books);
});

module.exports = router;
