const express = require('express');
const {findAll, findById, createFlow, update, deletee} = require('../controllers/RequestController')
const { createRequestValidation, isValidId, isIdInQueryValid} = require('../validator/requestValidator')
const router = express.Router();


router.get('/request', isIdInQueryValid, findAll);
router.get('/request/:id', isValidId, findById);
router.post('/request', createRequestValidation, createFlow);
router.put('/request/:id', update)
router.delete('/request/:id',isValidId, deletee);
module.exports = router;