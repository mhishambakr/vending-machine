const { getProducts, createProduct, updateProduct, deleteProduct, resotreProduct, decrement, decrementItems } = require("../services/Product.service");
const { buyProduct } = require("../services/Purchase.service");
const { decrementDeposit } = require("../services/User.service");


exports.getProducts = async (req, res) => {
    try {
        let products = await getProducts();

        res.status(200).json({
            message: 'Products fetched successfully',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.addProduct = async (req, res) => {
    try {
        let { id: sellerId } = res.locals.user;

        let product = await createProduct({ ...req.body, sellerId });

        res.status(200).json({
            message: 'Product added successfully',
            data: {
                product
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let { id } = res.locals.user

        let data = await updateProduct({ ...req.body });

        res.status(200).json({
            message: 'Product data updated successfully',
            data: {

            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        let { id } = req.query;
        let deleted = await deleteProduct({ id })

        res.status(200).json({
            message: 'Product deleted successfully',
            data: {

            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.restore = async (req, res) => {
    try {
        let { id } = req.body;
        let restored = await resotreProduct({ id })

        res.status(200).json({
            message: 'Product restored successfully',
            data: {
                restored
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.buyProduct = async (req, res) => {
    try {
        let { amountOfItems, productId } = req.body
        let { id: buyerId, deposit } = res.locals.user;

        let product = await decrementItems({ amountOfItems, productId });
        let { paid } = await decrementDeposit({ buyerId, amountOfItems, product })
        let purchase = await buyProduct({ amountOfItems, productId, buyerId });

        let change = Number(deposit) - Number(paid)
        res.status(200).json({
            message: `Product bought successfully. ${change} cents remaining in your balance`,
            data: {
                change
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}
