'use strict'
const { findRoleWithId, isUsernameExists, refresh, verifyEmail, create,
     register, logout, login,findUsers, update } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express');
const {signupValidation, loginValidation, isIdInParamValid, isUsernameInQueryValid, isRefreshTokenPresent,
    updateUserValidator} = require('../validator/authValidator');
const router = express.Router();

router.get('/auth/users', findUsers); //authMiddleware,
router.post('/auth/register',signupValidation, register);
router.post('/auth/create', signupValidation, authMiddleware,create);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/login', loginValidation, login);
router.post('/auth/logout',  authMiddleware, logout);
router.get('/auth/refresh', isRefreshTokenPresent,refresh);
router.get('/auth/username-exists', isUsernameInQueryValid,isUsernameExists);
router.get('/auth/user/:id', isIdInParamValid,findRoleWithId);
router.put('/auth/user/:id', updateUserValidator, update)







module.exports = router;