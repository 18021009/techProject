const express = require('express');
const { authenticate } = require('./../../middleware/auth');
const {
    login,
    getProfile,
    signUp,
    logout,
    refreshToken
} = require('./authController');
const {
    loginValidator,
    signUpValidator
} = require('./authValidator');

module.exports = (app) => {
    const router = express.Router();
    router.post('/login', loginValidator, login);
    router.post('/signUp', signUpValidator, signUp);
    router.get('/refresh-token', authenticate('refresh_token'), refreshToken);
    router.get('/profile', authenticate(), getProfile);
    router.get('/logout/:userName', authenticate(), logout);
    app.use('/', router);
};