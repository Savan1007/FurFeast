const express = require('express');
const supplierController = require('../controllers/supplierController');
const router = express.Router();


router.get('/suppliers', supplierController.findAll);
router.post('/suppliers',supplierController.create);
router.get('/suppliers/:id', supplierController.findByPk);
router.put('/suppliers/:id',supplierController.update);
router.delete('/suppliers/:id', supplierController.delete);



module.exports = router;