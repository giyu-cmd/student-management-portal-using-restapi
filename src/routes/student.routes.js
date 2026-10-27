const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Alex Johnson
 *         email:
 *           type: string
 *           example: alex.johnson@example.com
 *         age:
 *           type: integer
 *           example: 20
 *         course:
 *           type: string
 *           example: Computer Science
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2026-10-27T15:30:00.000Z
 *     StudentInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - course
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         age:
 *           type: integer
 *           example: 22
 *         course:
 *           type: string
 *           example: Software Engineering
 */

/**
 * @openapi
 * /api/v1/students:
 *   get:
 *     summary: Retrieve all student records
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: A successful response with list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 */
router.get('/', (req, res, next) => studentController.getAllStudents(req, res, next));

/**
 * @openapi
 * /api/v1/students/{id}:
 *   get:
 *     summary: Retrieve a single student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student primary key ID
 *     responses:
 *       200:
 *         description: Found student details.
 *       400:
 *         description: Invalid student ID.
 *       404:
 *         description: Student record not found.
 */
router.get('/:id', (req, res, next) => studentController.getStudentById(req, res, next));

/**
 * @openapi
 * /api/v1/students:
 *   post:
 *     summary: Add a new student record
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       201:
 *         description: Student record created successfully.
 *       400:
 *         description: Missing required fields or invalid input.
 *       409:
 *         description: Email already in use.
 */
router.post('/', (req, res, next) => studentController.createStudent(req, res, next));

/**
 * @openapi
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update an existing student record
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       200:
 *         description: Student record updated successfully.
 *       400:
 *         description: Validation error or invalid ID.
 *       404:
 *         description: Student record not found.
 *       409:
 *         description: Email conflict with another student.
 */
router.put('/:id', (req, res, next) => studentController.updateStudent(req, res, next));

/**
 * @openapi
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student record
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully.
 *       404:
 *         description: Student record not found.
 */
router.delete('/:id', (req, res, next) => studentController.deleteStudent(req, res, next));

module.exports = router;

