const jwt = require('jsonwebtoken');
const config = require('config');
const { respondWithError } = require('./../helper/messageResponse');
const { ErrorCodes } = require('./../helper/contants');

const SECRET_ACCESS_TOKEN_KEY = config.get("auth").SECRET_ACCESS_TOKEN_KEY;
const SECRET_REFRESH_TOKEN_KEY = config.get("auth").SECRET_REFRESH_TOKEN_KEY;

function authenticate(type = 'token') {
    const isRefresh = type === "refresh_token";
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const user = isRefresh ?
                (jwt.verify(token, SECRET_REFRESH_TOKEN_KEY)) :
                (jwt.verify(token, SECRET_ACCESS_TOKEN_KEY));

            // Token is invalid
            if (!user) {
                res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED);
                return res.json(respondWithError('ERROR_CODE_UNAUTHORIZED'));
            }

            // Token valid, set user to request
            req.body.loginUser = user;
            return next();
        } catch (e) {
            res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED);
            return res.json(respondWithError('ERROR_CODE_UNAUTHORIZED'));
        }
    };
}

module.exports = { authenticate }