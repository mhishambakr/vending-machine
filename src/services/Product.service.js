const { Product } = require("../models");
const ProductModel = require("../models/Product.model");



exports.getProducts = async () => {
    try {
        let products = await Product.findAndCountAll({

        })

        return products;
    } catch (err) {
        throw err;
    }
}

exports.createProduct = async ({ productName, cost, amountAvailable, sellerId }) => {
    try {
        let [product, created] = await Product.findOrCreate({
            where: { productName },
            defaults: {
                productName,
                cost,
                amountAvailable,
                sellerId
            }
        });

        if (!created) {
            throw {
                status: 409,
                message: "Product exist with the same name"
            }
        }

        return product
    } catch (err) {
        throw err;
    }
}

exports.updateProduct = async ({ id, productName, cost, amountAvailable }) => {
    try {
        let product = await Product.update({
            productName,
            cost,
            amountAvailable,

        }, {
            where: {
                id
            }
        })

        return product
    } catch (err) {
        throw err;
    }
}


exports.deleteProduct = async ({ id }) => {
    try {
        let deleted = await Product.destroy({
            where: {
                id
            }
        });

        return deleted
    } catch (err) {
        throw err;
    }
}

exports.resotreProduct = async ({id}) =>{
    try {
        let product = await Product.findOne({
            where: {
                id
            },
            paranoid: false
        });

        if (!product){
            throw{
                status: 404,
                message: 'Product not found'
            }
        }

        let restored = await Product.restore({
            where: {
                id
            }
        });

        return restored
    } catch (err) {
        throw err;
    }
}

exports.decrementItems = async ({amountOfItems, productId}) => {
    try {
        
        let product = await Product.findOne({
            where: {
                id: productId
            }
        })

        if (!product){
            throw{
                status: 404,
                message: 'Product not found'
            }
        }

        if (product?.amountAvailable < amountOfItems){
            throw{
                status: 409,
                message: `Not enought items. Only ${product?.amountAvailable}`
            }
        }

        let data = await Product.decrement('amountAvailable', { by: amountOfItems, where: {id: productId} });

        return product;
        
    } catch (err) {
        throw err;
    }
}

