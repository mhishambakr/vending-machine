const { createUser, loginUser, updateUser, findAllUsers, deleteUser, resotreUser, deposit, resetDeposit } = require("../services/User.service")

exports.findUser = async (req,res) => {
    try {
        res.status(200).json({
            message: 'User data fetched successfully',
            data: {
                user: res.locals.user
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.findUsers = async (req,res) => {
    try {
        let users = await findAllUsers();
        res.status(200).json({
            message: 'Users list fetched successfully',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.registerUser = async (req,res) =>{
    try {
        let data = await createUser(req.body);

        res.status(200).json({
            message: 'User registered successfully',
            data
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.login = async (req,res) => {
    try {
        let data = await loginUser(req.body);

        res.status(200).json({
            message: 'User logged in successfully',
            data
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.update = async(req,res) =>{
    try {
        let {id} = res.locals.user

        let data = await updateUser({id, ...req.body});

        res.status(200).json({
            message: 'User data updated successfully',
            data: {

            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.deleteUser = async (req,res) =>{
    try {
        let {id} = req.query;
        let deleted = await deleteUser({id})

        res.status(200).json({
            message: 'User deleted successfully',
            data: {
                
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.restore = async (req,res) => {
    try {
        let {username} = req.body;
        let restored = await resotreUser({username})

        res.status(200).json({
            message: 'User restored successfully',
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

exports.deposit = async (req,res) => {
    try {
        let {amount} = req.body;
        let {id: userId} = res.locals.user;

        let update = await deposit({userId, amount})

        res.status(200).json({
            message: 'Deposit incremented successfully',
            data: {
                update
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.resetDeposit = async (req,res) => {
    try {
        let {id: userId} = res.locals.user;

        let update = await resetDeposit({userId});

        res.status(200).json({
            message: 'Deposit resetted successfully',
            data: {
                update
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }

}