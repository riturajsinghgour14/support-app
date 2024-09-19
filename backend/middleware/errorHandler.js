const { stack } = require("../routes/userRoutes");

const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV ==='production' ? null : err.stack,
    })
};

module.exports = errorHandler;