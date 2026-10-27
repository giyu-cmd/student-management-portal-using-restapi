const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.url} ->`, err);

    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
    };

    // Only expose stack traces in development
    if (config.nodeEnv === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
