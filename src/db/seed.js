const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const seed = async () => {
    try {
        console.log('[Seed] Checking and seeding student records...');
        const seedSqlPath = path.join(__dirname, 'seed.sql');
        const sql = fs.readFileSync(seedSqlPath, 'utf8');

        await db.query(sql);

        // Verify row count
        const { rows } = await db.query('SELECT COUNT(*) AS total FROM students;');
        console.log(`[Seed] Success! Total students in database: ${rows[0].total}`);
        process.exit(0);
    } catch (error) {
        console.error('[Seed] Error during seeding:', error.message);
        process.exit(1);
    }
};

seed();
