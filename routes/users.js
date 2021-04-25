const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/users');
const passport = require('passport');

router.get('/register', renderRegisterForm);

router.post('/register', catchAsync(registerUser));

router.get('/login', renderLoginForm);

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), catchAsync(loginUser));

router.get('/logout', logoutUser);


module.exports = router;