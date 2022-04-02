const { Purchase } = require("../models");



exports.buyProduct = async ({amountOfItems, buyerId, productId})=>{
    try {
        let purchase = await Purchase.create({
            amountOfItems, 
            buyerId, 
            productId
        })

        return purchase;
    } catch (err) {
        throw err;
    }
}