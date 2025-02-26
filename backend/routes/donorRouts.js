const express = require('express');
const donorController = require('../controllers/donorController');
const router = express.Router();


router.get('/donors', donorController.findAll);
router.post('/donors',donorController.create);
router.get('/donors/:id', donorController.findByPk);
router.put('/donors/:id',donorController.update);
router.delete('/donors/:id', donorController.delete);



module.exports = router;