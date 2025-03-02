const donationService = require('../service/donationService');



/** @type {import("express").RequestHandler} */
exports.create = async(req, res, next) =>{
    try{
        const newDonation = await donationService.createDonation(req.body.donation,req.body.id)
        res.status(201).json({success:true, message:'donation added successfully', data: newDonation})
    }catch(error){
        console.error('DonationController error(create):', error.message)
        res.status(400).json({success:false, message: 'Somthing went wrong.'})
    }
}



/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res, next)=>{
    try{
        const includeDonor = req.query.includeDonor === 'true';
        const donations = await donationService.findAllDonations(includeDonor);
        console.log(donations)
        res.status(200).json({success:true, message:'', data: donations})
    }catch(error){
        console.error('DonationController error (findAll): ', error.message);
        res.status(500).json({success:false, message:'could not fetch donations!'})
    }
}

/** @type {import("express").RequestHandler} */
exports.findById = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const includeDonor = req.query.includeDonor === 'true';
        const donation = await donationService.findDonationById(id,includeDonor);
        res.status(200).json({success:true, message:'', data: donation})
    }catch(error){
        console.error('DonationController error(findById): ', error.message);
        res.status(404).json({success:false, message: error.message})
    }
} 


/** @type {import("express").RequestHandler} */
exports.delete = async (req, res, next)=>{
    try{
       const id = req.params.id;
       const isDeleted = await donationService.deleteDonationById(id);
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
        const donation = await donationService.updateDonation(req.params.id, req.body.donation);
        res.status(201).json({success:true, data:donation})
    }catch(error){
        console.error('Controller error(update, donationController): ', error.message);
        res.status(400).json({success:false, messasge: error.message});
    }
}


