const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Records REST API',
            version: '1.0.0',
            description: 'Containerized REST API for managing student records backed by PostgreSQL',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local Docker Server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Files containing annotations for API specs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
