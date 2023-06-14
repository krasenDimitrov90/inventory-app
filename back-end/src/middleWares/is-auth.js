const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');


    if (!authHeader) {
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.replace('Bearer ', '');
    let decodedToken = null;
    try {
        decodedToken = jwt.verify(token, 'chikinana');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};