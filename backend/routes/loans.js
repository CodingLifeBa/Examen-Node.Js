const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

router.post('/', loansController.loanBook);
router.get('/book/:id', loansController.listLoansByBook);
router.get('/student/:id', loansController.listLoansByStudent);
router.post('/return', loansController.returnBook);

module.exports = router;
