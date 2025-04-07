const DDService = require('../service/donationDetailsService');





/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res, next)=>{
    try{
       const include = req.query.include?.split(',');
       const dds =  await DDService.findAll(include);
       res.status(200).json({success:true, message:'', data: dds});
    }catch(error){
        console.error('Controller error(donationDetailsController, findAll()): ', error.message);
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
}


exports.findById = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const include = req.query.include?.split(',');
        const dd = await DDService.findById(id, include);
        res.status(200).json({success:true, message:'', data: dd});
    }catch(error){
        console.error('Controller error(donationDetailsController, findById()): ', error.message);
        if(error.message === 'DonationDetails Not Found.'){
            return res.status(404).json({success:false, message:'DonationDetails Not Found.'});
        }
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
}

exports.create = async (req, res, next)=>{
    try{
        const details = req.body.details;
        console.log(details);
        const newDetails = await DDService.create(details);
        res.status(201).json({success:true, message:'DonationDetails created successfully.', data: newDetails});
    }catch(error){
        console.error('Controller error(donationDetailsController, create()): ', error.message);
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
}

exports.deleteById = async (req, res, next)=>{ 
    try{
        const ids = req.body.ids;
        console.log(ids);
        console.log(Array.isArray(ids));
        const deleted = await DDService.deleteById(ids);
        if(deleted){
            res.status(200).json({success:true, message:'DonationDetails deleted successfully.'});
        }else{
            res.status(404).json({success:false, message:'DonationDetails Not Found.'});
        }
    }catch(error){
        console.error('Controller error(donationDetailsController, deleteById()): ', error.message);
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
}

exports.update = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const data = req.body.data;
        if(!data){
            return res.status(400).json({success:false, message:'Bad Request, data is required.'});
        }
        const updated = await DDService.update(id, data);
        res.status(200).json({success:true, message:'DonationDetails updated successfully.', data: updated});
    }catch(error){
        console.error('Controller error(donationDetailsController, update()): ', error.message);
        res.status(500).json({success:false, message:'Internal Server Error'});
    }
}