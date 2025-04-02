const {body, param,query} = require("express-validator");


const createRequestValidation = [
    body('request', 'Request object is missing').notEmpty(),
    body('request.requestedBy', 'requestedBy is missing in request object').trim().notEmpty(),
    body('request.requestType', 'requestType (donation or distribution) is missing in request object').trim().notEmpty()
      .isIn(['donation', 'distribution'])
      .withMessage('requestType must be either "donation" or "distribution"'),
    body('requestDetails', 'requestDetails are required and should be an array').isArray({ min: 1 }),
    body('requestDetails.*.inventoryId', 'Each detail must have inventoryId').notEmpty(),
    body('requestDetails.*.quantity', 'Each detail must have quantity').isNumeric().withMessage('Quantity must be a number'),
  
]

const isValidId = [
  param('id').isMongoId().withMessage('Invalid Request Id'),
]
const isIdInQueryValid = [
  query('userId').optional().isMongoId().withMessage('Invalid User Id')
]


module.exports = {createRequestValidation, isValidId, isIdInQueryValid}