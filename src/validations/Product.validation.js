const joi = require('joi')


exports.addProductSchema = joi.object({

    productName : joi.string().lowercase().pattern(/^[a-z]+$/, { name: 'alphabet' }), 
    
    cost: joi.number().positive().integer(), 
    
    amountAvailable : joi.number().positive().integer()
})

exports.updateProductSchema = joi.object({

    id: joi.number().positive().integer(), 

    productName : joi.string().lowercase().pattern(/^[a-z]+$/, { name: 'alphabet' }), 
    
    cost: joi.number().positive().integer(), 
    
    amountAvailable : joi.number().positive().integer()
})

exports.buyProductSchema = joi.object({

    amountOfItems: joi.number().positive().integer(), 
    
    productId : joi.number().positive().integer()
})

exports.deleteSchema = joi.object({
    id: joi.number().integer().positive().required()
})

exports.restoreSchema = joi.object({
    id: joi.number().integer().positive().required()
})


