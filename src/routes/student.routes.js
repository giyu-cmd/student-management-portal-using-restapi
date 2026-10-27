const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// Bind controller methods to preserve 'this' context if needed
router.get('/', (req, res, next) => studentController.getAllStudents(req, res, next));
router.get('/:id', (req, res, next) => studentController.getStudentById(req, res, next));
router.post('/', (req, res, next) => studentController.createStudent(req, res, next));
router.put('/:id', (req, res, next) => studentController.updateStudent(req, res, next));
router.delete('/:id', (req, res, next) => studentController.deleteStudent(req, res, next));

module.exports = router;
