const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require('./catchAsyncError');

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    let {token} = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
}
);