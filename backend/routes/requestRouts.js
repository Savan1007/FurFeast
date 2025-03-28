const express = require('express');
const requestController = require('../controllers/RequestController')
const { createRequestValidation,} = require('../validator/requestValidator')
const router = express.Router();


router.get('/request', requestController.findAll);
router.get('/request/:id', requestController.findById);
router.post('/request', createRequestValidation,requestController.createFlow);
router.put('/request/:id', requestController.update)
//router.delete('/request/:id',)
module.exports = router;