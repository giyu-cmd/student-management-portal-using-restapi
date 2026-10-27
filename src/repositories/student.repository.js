const db = require('../config/db');

class StudentRepository {
    // Fetch all students ordered by newest first
    async findAll() {
        const query = 'SELECT * FROM students ORDER BY id DESC;';
        const { rows } = await db.query(query);
        return rows;
    }

    // Fetch a student by primary key ID
    async findById(id) {
        const query = 'SELECT * FROM students WHERE id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0] || null;
    }

    // Fetch a student by email (useful for checking duplicates)
    async findByEmail(email) {
        const query = 'SELECT * FROM students WHERE email = $1;';
        const { rows } = await db.query(query, [email]);
        return rows[0] || null;
    }

    // Insert a new student record
    async create({ name, email, age, course }) {
        const query = `
      INSERT INTO students (name, email, age, course)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const { rows } = await db.query(query, [name, email, age, course]);
        return rows[0];
    }

    // Update an existing student record
    async update(id, { name, email, age, course }) {
        const query = `
      UPDATE students
      SET name = $1, email = $2, age = $3, course = $4
      WHERE id = $5
      RETURNING *;
    `;
        const { rows } = await db.query(query, [name, email, age, course, id]);
        return rows[0] || null;
    }

    // Delete a student record
    async delete(id) {
        const query = 'DELETE FROM students WHERE id = $1 RETURNING id;';
        const { rows } = await db.query(query, [id]);
        return rows[0] || null;
    }
}

module.exports = new StudentRepository();
