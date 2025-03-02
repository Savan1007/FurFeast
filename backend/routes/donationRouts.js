const express = require('express');
const donationController = require('../controllers/donationController');

const router = express.Router();


router.get('/donation', donationController.findAll);
router.get('/donation/:id', donationController.findById)
router.post('/donation', donationController.create);
router.delete('/donation/:id', donationController.delete);
router.put('/donation/:id', donationController.update);
module.exports = router;