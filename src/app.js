const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config/env');
const initDb = require('./db/initDb');
const studentRoutes = require('./routes/student.routes');
const errorHandler = require('./middlewares/errorHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Serve interactive Swagger docs at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

// Serve static frontend files (prepared for Phase 3 UI)
app.use(express.static(path.join(__dirname, '../public')));

// Health Check Endpoint (Essential for Docker and load balancers)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Mount Student API Routes
app.use('/api/v1/students', studentRoutes);

// 404 Route Handler for undefined endpoints
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Resource not found' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Server Startup & DB Initialization
const startServer = async () => {
    try {
        // Ensure table exists before accepting traffic
        await initDb();

        app.listen(config.port, () => {
            console.log(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
            console.log(`Health check: http://localhost:${config.port}/health`);
            console.log(`API Base URL: http://localhost:${config.port}/api/v1/students`);
        });
    } catch (error) {
        console.error('Fatal error during application startup:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
