const studentRepo = require('../repositories/student.repository');

class StudentController {
    // GET /api/v1/students
    async getAllStudents(req, res, next) {
        try {
            const students = await studentRepo.findAll();
            res.status(200).json({
                success: true,
                count: students.length,
                data: students,
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/v1/students/:id
    async getStudentById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Invalid student ID' });
            }

            const student = await studentRepo.findById(id);
            if (!student) {
                return res.status(404).json({ success: false, message: 'Student record not found' });
            }

            res.status(200).json({ success: true, data: student });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/v1/students
    async createStudent(req, res, next) {
        try {
            const { name, email, age, course } = req.body;

            // Validation
            if (!name || !email || !course) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: name, email, and course are mandatory',
                });
            }

            // Check unique email
            const existing = await studentRepo.findByEmail(email);
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: 'A student with this email address already exists',
                });
            }

            const newStudent = await studentRepo.create({
                name,
                email,
                age: age ? parseInt(age, 10) : null,
                course,
            });

            res.status(201).json({
                success: true,
                message: 'Student record created successfully',
                data: newStudent,
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/v1/students/:id
    async updateStudent(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Invalid student ID' });
            }

            const { name, email, age, course } = req.body;
            if (!name || !email || !course) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: name, email, and course are mandatory',
                });
            }

            // Check if student exists
            const existing = await studentRepo.findById(id);
            if (!existing) {
                return res.status(404).json({ success: false, message: 'Student record not found' });
            }

            // If email is changing, verify no collision
            if (email !== existing.email) {
                const emailOwner = await studentRepo.findByEmail(email);
                if (emailOwner && emailOwner.id !== id) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email is already taken by another student',
                    });
                }
            }

            const updated = await studentRepo.update(id, {
                name,
                email,
                age: age ? parseInt(age, 10) : null,
                course,
            });

            res.status(200).json({
                success: true,
                message: 'Student record updated successfully',
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/v1/students/:id
    async deleteStudent(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Invalid student ID' });
            }

            const deleted = await studentRepo.delete(id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Student record not found' });
            }

            res.status(200).json({
                success: true,
                message: `Student with ID ${id} deleted successfully`,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StudentController();
