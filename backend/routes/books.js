const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.post('/', booksController.addBook);
router.get('/', booksController.listBooks);
router.get('/search', booksController.searchBook);
router.get('/category', booksController.searchByCategory);

module.exports = router;
