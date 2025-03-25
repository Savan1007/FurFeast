'use strict'
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express');
const router = express.Router();

router.get('/auth/users', authController.findUsers);//authMiddleware
router.post('/auth/register', authController.register);
router.post('/auth/create', authMiddleware,authController.create) 
router.get('/auth/verify-email', authController.verifyEmail);
router.post('/auth/login', authController.login);
router.post('/auth/logout',  authMiddleware,authController.logout);
router.get('/auth/refresh', authController.refresh)
router.get('/auth/username-exists', authController.isUsernameExists);

// change password roat left!







module.exports = router;