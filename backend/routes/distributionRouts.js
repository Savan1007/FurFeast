const express = require('express');
const router = express.Router();
const DController = require('../controllers/distributionController');


router.get('/distribution', DController.findAll);
router.get('/distribution/:id', DController.findById);
router.post('/distribution', DController.create);
router.put('/distribution/:id', DController.update);
router.delete('/distribution/:id', DController.delete);


module.exports = router;