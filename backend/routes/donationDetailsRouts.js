const express = require('express');
const DDController  = require('../controllers/donationDetailsController');
const router = express.Router();


router.get('/dds', DDController.findAll);
router.get('/dds/:id', DDController.findById);
router.post('/dds', DDController.create);
router.delete('/dds', DDController.deleteById);
router.put('/dds/:id', DDController.update);

module.exports = router;