const { editSchema, depositSchema, deleteSchema, restoreSchema } = require("../validations/User.validation");


exports.editValidation = async (req, res, next) => {
    try {
        let { username, password, role } = req.body;
        await editSchema.validateAsync({ username, password, role })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.depositValidation = async (req, res, next) => {
    try {
        let { amount } = req.body;
        await depositSchema.validateAsync({ amount })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.deleteValidation = async (req, res, next) => {
    try {
        let { id } = req.query;
        await deleteSchema.validateAsync({ id })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.restoreValidation = async (req, res, next) => {
    try {
        let { username } = req.body;
        await restoreSchema.validateAsync({ username })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
