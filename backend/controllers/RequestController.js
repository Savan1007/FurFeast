'use strict';


const RequestService = require('../service/RequestService');
const { validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const BadRequestError = require('../config/errors/BadRequestError');
const NotFoundError = require('../config/errors/NotFoundError');


exports.findAll = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);
  const { data, currentPage, totalPages, totalItems } = await RequestService.findAll(req.query);
  res.status(200).json({ success: true, data, currentPage, totalPages, totalItems });
});


exports.findById = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  const id = req.params.id;
  const result = await RequestService.findById(id);
  res.status(200).json({ success: true, data: result });
});


exports.update = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);
  
  await RequestService.update(req.params.id, req.body);
  res.status(200).json({ success: true, message: 'Request updated successfully' });
});


exports.deletee = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  const deleted = await RequestService.deleteById(req.params.id);
  if (!deleted) throw new NotFoundError('Request not found or already deleted');
  
  res.status(204).end();
});


exports.createFlow = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);
  
  await RequestService.createFlow(req.body);
  res.status(201).json({ success: true, message: 'Request flow created successfully' });
});



// /** @type {import("express").RequestHandler} */
// exports.create = async (req, res) => {
//   try {
//     const errors = validationResult(req).array();
//     console.log('create controller',errors)
//     if(errors.length>0){throw { status: 400, errors: errors };}
//     const result = await RequestService.create(req.body);
//     res.status(201).json({ success: true, data: result, message: 'Request created successfully' });
//   } catch (error) {
//     if (error?.errors) {return res.status(error.status || 400).json({ success: false, message: 'Validation error', errors: error.errors });}
//     console.error('RequestController error (create):', error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };