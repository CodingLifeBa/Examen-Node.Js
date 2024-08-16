const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.post('/', studentsController.addStudent);
router.get('/', studentsController.listStudents);
router.get('/search', studentsController.searchStudent);

module.exports = router;
