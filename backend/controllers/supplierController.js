const SupplierService = require('../service/supplierService')


/** @type {import("express").RequestHandler} */
exports.findAll = async (req, res, next)=>{
    try{
        const suppliers = await SupplierService.findAllSupplier();
        res.status(200).json({data: suppliers})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.create = async(req,res, next)=>{
    try{
      const supplier = await SupplierService.createSupplier(req.body.supplier)
      return res.status(201).json({success:true, message:"Supplier created successfully", data:supplier})
    }catch(error){
        if(error.message == 'Duplicate entry: A supplier with this email already exists.'){
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
        const supplier = await SupplierService.findById(req.params.id)
        res.status(200).json({success: true, message: '', data:supplier})
    }catch(error){
        res.status(404).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.update = async(req, res, next)=>{
    try{
        const supplier = await SupplierService.updateSupplier(req.params.id, req.body.supplier)
        res.status(201).json({success:true, data:supplier })
    }catch(error){
        console.error('Controller error (update):', error.message)
        res.status(400).json({success:false, message: error.message})
    }
}


/** @type {import("express").RequestHandler} */
exports.delete = async(req, res, next)=>{
    try{

        const isDeleted = await SupplierService.deleteSupplier(req.params.id);
        if(isDeleted){
            res.status(204).end();
        }else{
            throw new Error('Some thing went wrong')
        }  
    }catch(error){
        console.error('Controller error (delete, supplierController): ',error.message)
        res.status(404).json({success:false, message: error.message})
    }
}



