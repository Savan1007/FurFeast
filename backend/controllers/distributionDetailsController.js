'use strict';
const DDsService = require('../service/distributionDetailsService');


exports.findAll = async (req, res) => {
    try {
        const distributionDetails = await DDsService.findAll();
        res.status(200).json({success: true, data: distributionDetails});
    } catch (error) {
        console.error("Controller error, (distributionDetailsController, findAll())", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.findById = async (req, res) => {
    try {
        const distributionDetails = await DDsService.findById(req.params.id);
        res.status(200).json({success: true, data: distributionDetails});
    } catch (error) {
        if(error.message === 'DistributionDetails Not Found.'){
            return res.status(404).json({success: false, message: error.message});     
        }
        console.error("Controller error, (distributionDetailsController, findById())", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.create = async (req, res) => {
    try {
        const distributionDetails = await DDsService.create(req.body);
        res.status(201).json({success: true, data: distributionDetails});
    } catch (error) {
        console.error("Controller error, (distributionDetailsController, create())", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        const distributionDetails = await DDsService.update(req.params.id, req.body);
        res.status(200).json({success: true ,data: distributionDetails, message: 'DistributionDetails updated successfully.'});
    } catch (error) {
        console.error("Controller error, (distributionDetailsController, update())", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const distributionDetails = await DDsService.delete(req.params.id);
        res.status(200).json({success: true, message: 'DistributionDetails deleted successfully.'});
    } catch (error) {
        console.error("Controller error, (distributionDetailsController, delete())", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}