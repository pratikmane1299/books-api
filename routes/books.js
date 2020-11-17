const express = require('express');

const db = require('../db');

const router = express.Router();

router.use('/', (req, res) => {
  res.json({
    message: 'Books API'
  });
});

module.exports = router;
