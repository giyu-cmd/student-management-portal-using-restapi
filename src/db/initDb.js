const db = require('../config/db');

const initDb = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INT CHECK (age > 0),
      course VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await db.query(queryText);
        console.log('Database initialized: students table verified/created.');
    } catch (error) {
        console.error('Failed to initialize database table:', error.message);
    }
};

module.exports = initDb;
