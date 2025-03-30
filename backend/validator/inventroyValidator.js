const { param, body } = require('express-validator');

const findByIdValidation = [
  param('id').isMongoId().withMessage('Invalid inventory ID'),
];

const updateInventoryQuantity = [
  param('id').isMongoId().withMessage('Invalid inventory ID'),
  body('quantity').isInt({min: 0}).withMessage('Quantity must be a non-negative integer'),
]


module.exports = {findByIdValidation, updateInventoryQuantity}