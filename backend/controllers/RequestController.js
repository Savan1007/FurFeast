'use strict';

const RequestService = require('../service/RequestService');

/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res) => {
  try {
    const result = await RequestService.findAll(req.query);
    res.status(200).json({ success: true, data: result });
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

/** @type {import("express").RequestHandler} */
exports.create = async (req, res) => {
  try {
    const result = await RequestService.create(req.body);
    res.status(201).json({ success: true, data: result, message: 'Request created successfully' });
  } catch (error) {
    console.error('RequestController error (create):', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
exports.update = async (req, res) => {
  try {
    const result = await RequestService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: result, message: 'Request updated successfully' });
  } catch (error) {
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
    //remove data we do not send it to the front
    const { createdRequest, createdDetails } = await RequestService.createFlow(req.body);
    res.status(201).json({ success: true, data: { createdRequest, createdDetails }, message: 'Request flow created successfully' });
  } catch (error) {
    console.error('RequestController error (createFlow):', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
