const express = require('express');
const router = express.Router();
const DDsController = require('../controllers/distributionDetailsController');




router.get('/distds',DDsController.findAll);
router.get('/distds/:id',DDsController.findById);
router.post('/distds',DDsController.create);
router.put('/distds/:id',DDsController.update);
router.delete('/distds/:id',DDsController.delete);

module.exports = router;