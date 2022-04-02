const express = require('express');

const router = express.Router();

const { registerUser, login, update, findUsers, findUser, deleteUser, restore, deposit, resetDeposit } = require('../controllers/User.controller');
const { userAuthentication, registerValidation, loginValidation } = require('../middlewares/Auth.middleware');
const { editValidation, depositValidation, deleteValidation, restoreValidation } = require('../middlewares/User.middlewares');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, login);
router.get('/list', userAuthentication, findUsers);
router.get('/data', userAuthentication, findUser);
router.patch('/edit', userAuthentication, editValidation, update);
router.patch('/deposit', userAuthentication, depositValidation, deposit);
router.patch('/reset', userAuthentication, resetDeposit);
router.delete('/delete', userAuthentication, deleteValidation, deleteUser);
router.patch('/restore', restoreValidation, restore);



module.exports = router;