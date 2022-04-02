
const { Product } = require("../models");
const { addProductSchema, updateProductSchema, deleteSchema, restoreSchema, buyProductSchema } = require("../validations/Product.validation");

exports.addProductValidation = async (req, res, next) => {
    try {
        let { productName, cost, amountAvailable } = req.body;
        await addProductSchema.validateAsync({ productName, cost, amountAvailable })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


exports.updateProductValidation = async (req, res, next) => {
    try {
        let { id, productName, cost, amountAvailable } = req.body;
        await updateProductSchema.validateAsync({ id, productName, cost, amountAvailable })

        let product = await Product.findOne({
            where: {id},
            paranoid: false
        })

        if (!product){
            throw {
                status: 404,
                message: 'Product Not found'
            }
        }

        
        if (res.locals.user.id != product.sellerId){
            throw {
                status : 401,
                message: 'You are not authorized to update this product'
            }
        }
        
        if (product.destroyTime){
            throw{
                status: 404,
                message: 'This product was deleted by seller'
            }
        }

        res.locals.product = product;

        next()
    } catch (err) {
        res.status(err.status || 400).json({
            message: err.message
        })
    }
}


exports.deleteValidation = async (req, res, next) => {
    try {
        let { id } = req.query;
        await deleteSchema.validateAsync({ id })

        let product = await Product.findOne({
            where: {id},
            paranoid: false
        })

        if (!product){
            throw {
                status: 404,
                message: 'Product Not found'
            }
        }

        
        if (res.locals.user.id != product.sellerId){
            throw {
                status : 401,
                message: 'You are not authorized to delete this product'
            }
        }
        
        if (product.destroyTime){
            throw{
                status: 404,
                message: 'This product was already deleted'
            }
        }

        res.locals.product = product;

        next()
    } catch (err) {
        res.status(err.status || 400).json({
            message: err.message
        })
    }
}

exports.restoreValidation = async (req, res, next) => {
    try {
        let { id } = req.body;
        await restoreSchema.validateAsync({ id })

        let product = await Product.findOne({
            where: {id},
            paranoid: false
        })

        if (!product){
            throw {
                status: 404,
                message: 'Product Not found'
            }
        }

        
        if (res.locals.user.id != product.sellerId){
            throw {
                status : 401,
                message: 'You are not authorized to restore this deleted product'
            }
        }
        
        if (!product.destroyTime){
            throw{
                status: 404,
                message: 'This product is not deleted'
            }
        }

        res.locals.product = product;

        next()
    } catch (err) {
        res.status(err.status || 400).json({
            message: err.message
        })
    }
}


exports.buyValidation = async (req, res, next) => {
    try {
        let { amountOfItems, productId } = req.body;
        await buyProductSchema.validateAsync({ amountOfItems, productId })

        let product = await Product.findOne({
            where: {id},
            paranoid: false
        })

        if (!product){
            throw {
                status: 404,
                message: 'Product Not found'        
            }
        }


        if (res.locals.user.id != product.sellerId){
            throw {
                status : 401,
                message: 'You are not authorized to restore this deleted product'
            }
        }
        
        if (product.destroyTime){
            throw{
                status: 404,
                message: 'This product is not deleted'
            }
        }

        res.locals.product = product;

        next()
    } catch (err) {
        res.status(err.status || 400).json({
            message: err.message
        })
    }
}
