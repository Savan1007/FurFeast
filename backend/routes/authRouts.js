'use strict'
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express');
const {signupValidation, loginValidation} = require('../validator/authValidator')
const router = express.Router();

router.get('/auth/users', authMiddleware,authController.findUsers);
router.post('/auth/register',signupValidation, authController.register);
router.post('/auth/create', signupValidation, authMiddleware,authController.create);
router.get('/auth/verify-email', authController.verifyEmail);
router.post('/auth/login', loginValidation,authController.login);
router.post('/auth/logout',  authMiddleware,authController.logout);
router.get('/auth/refresh', authController.refresh);
router.get('/auth/username-exists', authController.isUsernameExists);
router.get('/auth/user/:id', authController.findRoleWithId);
// change password rout left!







module.exports = router;