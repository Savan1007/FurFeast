const RecipientService = require('../service/recipientService');


/** @type {import("express").RequestHandler} */
exports.create = async (req, res, next)=>{
    try{
        console.log(req.body.recipient)
        const newRecipient = await RecipientService.createRecipient(req.body.recipient);
        res.status(201).json({success:true, message:'recipient added successfully', data:newRecipient});

    }catch(error){
        console.error('Controoler Error, (RecipientController, create): ', error.message);
        res.status(400).json({success:false, message:error.message||'Somthing went wrong.'})
    }
}


exports.findAll = async (req, res, next)=>{
    try{
        const recipients = await RecipientService.findAllRecipient();
        res.status(200).json({success:true, data: recipients})
    }catch(error){
        console.error('Controoler Error, (RecipientController, findAll): ', error.message)
        res.status(500).json({success:false, message: error.message})
    }
}

exports.findByPk = async(req,res,next)=>{  
    try{
        const recipient = await RecipientService.findById(req.params.id)
        res.status(200).json({success: true, message: '', data:recipient})
    }catch(error){
        console.error('Controoler Error, (RecipientController, findByPk()): ', error.message)
        res.status(404).json({success:false, message: error.message})
    }
}


exports.update = async(req, res, next)=>{
    try{
        console.log(req.body.recipient)
        const recipient = await RecipientService.updateRecipient(req.params.id, req.body.recipient)
        res.status(201).json({success:true, data:recipient })
    }catch(error){
        console.error('Controoler Error, (RecipientController, update()): ', error.message)
        res.status(400).json({success:false, message: error.message})
    }
}

exports.delete = async(req, res, next)=>{
    try{

        const isDeleted = await RecipientService.deleteRecipient(req.params.id);
        if(isDeleted){
            res.status(204).end();
        }else{
            throw new Error('Some thing went wrong')
        }  
    }catch(error){
        console.error('Controller error (supplierController, delete()): ',error.message)
        res.status(404).json({success:false, message: error.message})
    }
}




