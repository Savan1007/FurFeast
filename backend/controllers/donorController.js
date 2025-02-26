const DonorService = require('../service/donorService')


/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res, next)=>{
    try{
        const donors = await DonorService.findAllDonor();
        res.status(200).json({data: donors})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.create = async(req,res, next)=>{
    try{
      const donor = await DonorService.createDonor(req.body.donor)
      return res.status(201).json({success:true, message:"Donor created successfully", data:donor})
    }catch(error){
        if(error.message == 'Duplicate entry: A donor with this email already exists.'){
            return res.status(400).json({success:false, message: error.message });
        }else if (error.message.includes('Database error')) {
            return res.status(500).json({success:false, message: 'Internal server error' });
          }
        return res.status(500).json({success: false, message: 'Unexpected error occurred' });
    }
}

/** @type {import("express").RequestHandler} */
exports.findByPk = async(req,res,next)=>{  
    try{
        const donor = await DonorService.findById(req.params.id)
        res.status(200).json({success: true, message: '', data:donor})
    }catch(error){
        res.status(404).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.update = async(req, res, next)=>{
    try{
        const donor = await DonorService.updateDonor(req.params.id, req.body.donor)
        res.status(201).json({success:true, data:donor })
    }catch(error){
        console.error('Controller error (update):', error.message)
        res.status(400).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.delete = async(req, res, next)=>{
    try{

        const isDeleted = await DonorService.deleteDonor(req.params.id);
        if(isDeleted){
            res.status(204).json({success:true, message:'Recod deleted successfully.'})
        }else{
            console.error('Controller error (delete, donorController) ')
            throw new Error('Some thing went wrong')
        }  
    }catch(error){
        console.error('Controller error (delete, donorController): ',error.message)
        res.status(404).json({success:false, message: error.message})
    }
}



