const { ErrorCodes } = require('./contants');

function respondSuccess(data) {
    return {
        data,
    };
}

function respondWithError(message = 'Error', ) {
    return {
        message,
    };
}

module.exports = { respondSuccess, respondWithError };