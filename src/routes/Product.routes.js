const express = require('express');

const router = express.Router();

const { getProducts, addProduct, updateProduct, deleteProduct, restore, buyProduct } = require('../controllers/Product.controller');
const { userAuthentication, checkRole } = require('../middlewares/Auth.middleware');
const { addProductValidation, updateProductValidation, deleteValidation, restoreValidation, buyValidation } = require('../middlewares/Product.middlewares');

router.get('/list', getProducts);
router.post('/add', userAuthentication, checkRole, addProductValidation, addProduct);
router.patch('/update', userAuthentication, checkRole, updateProductValidation, updateProduct);
router.delete('/delete', userAuthentication, checkRole, deleteValidation, deleteProduct);
router.patch('/restore', userAuthentication, checkRole, restoreValidation, restore);
router.post('/buy', userAuthentication, checkRole, buyValidation, buyProduct);



module.exports = router;