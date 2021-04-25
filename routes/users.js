const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(renderRegisterForm)
    .post(catchAsync(registerUser));

router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(loginUser));

router.get('/logout', logoutUser);


module.exports = router;