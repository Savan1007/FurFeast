const express = require('express');
const recipientController = require('../controllers/recipientController');
const router = express.Router();



router.post("/recipient", recipientController.create);
router.get("/recipient", recipientController.findAll);
router.get("/recipient/:id", recipientController.findByPk);
router.put("/recipient/:id", recipientController.update);
router.delete("/recipient/:id", recipientController.delete);





module.exports = router;