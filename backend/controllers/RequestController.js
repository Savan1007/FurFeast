'use strict';

const RequestService = require('../service/RequestService');
const { validationResult } = require("express-validator");


/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res) => {
  // add time period to the filter
  try {
    const {data,currentPage, totalPages, totalItems} = await RequestService.findAll(req.query);
   
    res.status(200).json({ success: true, data, currentPage, totalPages,totalItems });
  } catch (error) {
    console.error('RequestController error (findAll):', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await RequestService.findById(id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('RequestController error (findById):', error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

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

/** @type {import("express").RequestHandler} */
exports.update = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if(errors.length>0){throw { status: 400, errors: errors };}
    await RequestService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Request updated successfully' });
  } catch (error) {
    if (error?.errors) {return res.status(error.status || 400).json({ success: false, message: 'Validation error', errors: error.errors });}
    console.error('RequestController error (update):', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
exports.delete = async (req, res) => {
  try {
    const deleted = await RequestService.deleteById(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      throw new Error('Request not found or already deleted.');
    }
  } catch (error) {
    console.error('RequestController error (delete):', error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
exports.createFlow = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if(errors.length>0){throw { status: 400, errors: errors };}
    await RequestService.createFlow(req.body);
    res.status(201).json({ success: true, message: 'Request flow created successfully' });
  } catch (error) {
    if (error?.errors) {return res.status(error.status || 400).json({ success: false, message: 'Validation error', errors: error.errors });}
    console.error('RequestController error (createFlow):', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
