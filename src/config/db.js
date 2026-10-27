const { Pool } = require('pg');
const config = require('./env');

// Create a single shared pool instance using our env configuration
const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection fails
});

// Event listener triggered whenever a new client connects to the backend
pool.on('connect', () => {
    console.log('[Database] Connected to PostgreSQL server successfully.');
});

// Event listener for unexpected errors on idle clients
pool.on('error', (err) => {
    console.error('[Database] Unexpected error on idle client:', err);
    process.exit(-1);
});

// Export a query helper function and the pool itself
module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};
