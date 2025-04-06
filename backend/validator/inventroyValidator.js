const { param, body } = require('express-validator');

const findByIdValidation = [
  param('id').isMongoId().withMessage('Invalid inventory ID'),
];

const updateInventoryQuantity = [
  param('id').isMongoId().withMessage('Invalid inventory ID'),
  body('quantity').isInt({min: 0}).withMessage('Quantity must be a non-negative integer'),
]

const updateInventoryByModel = [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('itemType')
    .optional()
    .isIn(['food', 'miscellaneous'])
    .withMessage('Invalid item type'),

  body('itemName')
    .optional()
    .isString()
    .withMessage('Item name must be a string'),

  body('quantity')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Quantity must be a non-negative number'),

  body('unit')
    .optional()
    .isIn(['kg', 'can', 'piece'])
    .withMessage('Invalid unit'),

  body('lowStockThreshold')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Low stock threshold must be a non-negative number')
];




module.exports = {findByIdValidation, updateInventoryQuantity, updateInventoryByModel}