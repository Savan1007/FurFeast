const donationService = require('../service/donationService');



/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res, next)=>{
    try{
        const include = req.query.include?.split(',');
        const donations = await donationService.findAll(include);
        res.status(200).json({success:true, message:'', data: donations})
    }catch(error){
        console.error('DonationController error (findAll): ', error.message);
        res.status(500).json({success:false, message:error.message})
    }
}

/** @type {import("express").RequestHandler} */
exports.findById = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const include = req.query.include?.split(',');
        const donation = await donationService.findById(id,include);

        res.status(200).json({success:true, message:'', data: donation})
    }catch(error){
        console.error('DonationController error(findById): ', error.message);
        res.status(404).json({success:false, message: error.message})
    }
} 


/** @type {import("express").RequestHandler} */
exports.create = async(req, res, next) =>{
    try{ 
        if(!req.body.donation||!req.body.id){throw new Error('Please include donation as donation and supplier_id as id in body.')}
        const newDonation = await donationService.create(req.body.id,req.body.donation,undefined)
        res.status(201).json({success:true, message:'donation added successfully', data: newDonation})
    }catch(error){
        console.error('DonationController error(create):', error.message)
        res.status(400).json({success:false, message: error.message})
    }
}



/** @type {import("express").RequestHandler} */
exports.delete = async (req, res, next)=>{
    try{
       const id = req.params.id;
       const isDeleted = await donationService.deleteById(id);
       if(isDeleted){
           res.status(204).end();
       }else{
        throw new Error("Some thing went wrong")
       }
    }catch(error){
        console.error('Controller error (delete, donationController): ',error.message)
        res.status(404).json({success:false, message: error.message})
    }
}


exports.update = async(req, res, next)=>{
    try{
        if(!req.body.data){throw new Error('Please include donatin_id as id and new data as data in body.')}
        const donation = await donationService.update(req.params.id, req.body.data);
        res.status(200).json({success:true, data:donation})
    }catch(error){
        if(error.message ==='Donation Not Found.'){ return res.status(404).json({success:false, messasge: error.message})};
        console.error('Controller error(update, donationController): ', error.message);
        res.status(400).json({success:false, messasge: error.message});
    }
}

exports.createFlow = async(req, res, next)=>{
    try{
        const {createdDonation, createdDonationDetails, createdSupplier} = await donationService.createFlow(req.body);
        res.status(201).json({success:true, message:"request created successfully", data:{createdDonation, createdDonationDetails, createdSupplier}})
    }catch(error){
        console.error('Controller error, (donationController, createFlow())', error.message);
        res.status(500).json({success:false, message: error.message});

    }
}


