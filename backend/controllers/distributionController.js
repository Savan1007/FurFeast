'use strict'

const DS = require('../service/distributionService');


exports.findAll = async (req, res) => {
    try{ 
         const result = await DS.findAll(req.query);
        res.status(200).json({success: true, data: result});
    }catch(error){
        console.error('Controller error, (distributionController, findAll()): ', error.message);
        res.status(500).json({success:false,message: 'Server error'});
    }
}

exports.findById = async (req, res) => {
    try{
        const id = req.params.id;
        const include = req.query?.include?.split(',');
        const result = await DS.findById(id, include);
        res.status(200).json({success: true, data: result});
    }
    catch(error){
        console.error('Controller error, (distributionController, findById()): ', error.message);
        (error.message === 'Distribution not found') ? res.status(404).json({success:false, message: error.message}) :
        res.status(500).json({success:false,message: 'Server error'});
    }
}

exports.create = async (req, res) => {
    try{
        const distribution = req.body;
        const result = await DS.create(distribution);
        res.status(201).json({success: true, data: result});
    }catch(error){
        console.error('Controller error, (distributionController, create()): ', error.message);
        if(error.message === 'Recipient Not Found.') {return res.status(404).json({success:false, message: error.message})}
        return res.status(500).json({ success:false, message: error.message});
    }
}

exports.update = async (req, res) => {
    try{
        const distId = req.params.id;
        const distData = req.body;
        await DS.update(distId, distData);
        res.status(200).json({success: true, message: 'Distribution updated successfully'});
    }catch(error){
        console.error('Controller error, (distributionController, update()): ', error.message);
        if(error.message === 'Distribution not found' || 'Recipient Not Found.') {return res.status(404).json({success:false, message: error.message})}
        return res.status(500).json({ success:false, message: error.message});
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedDist = await DS.delete(id);
        console.log('result: ', result);
        res.status(200).json({success: true, message: 'Distribution deleted successfully', data: deletedDist});
    }catch(error){
        console.error('Controller error, (distributionController, delete()): ', error.message);
        res.status(500).json({ success:false, message: error.message});
    }
}

exports.createFlow = async (req, res) => {
    try{
        const data = req.body;
        const {recipient, distribution, distributionDetails } = await DS.createFlow(data);
        res.status(201).json({success: true, data: {recipient, distribution, distributionDetails}, message: `Distribution created successfully`});
    }catch(error){
        console.error('Controller error, (distributionController, createFlow()): ', error.message);
        res.status(500).json({ success:false, message: error.message});
    }
}