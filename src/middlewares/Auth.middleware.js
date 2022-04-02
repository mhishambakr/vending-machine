const { secret } = require('../../config/auth.config');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { roles } = require('../authentication/roles');
const { registerSchema, loginSchema, authSchema } = require('../validations/User.validation');


exports.userAuthentication = async (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            throw {
                status: 401,
                message: 'Unauthorized. Please login first'
            }
        }
        let token = req?.headers?.authorization.split(' ')[1] || ''

        console.log(token);

        await authSchema.validateAsync({ token });

        let decoded = await jwt.verify(token, secret);

        let user = await User.findOne({
            where: {
                id: decoded.id
            },
            attributes: ['id', 'username', 'role', 'deposit'],
            raw: true,
            nest: true,
        })

        res.locals.user = user;

        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
};

exports.checkRole = async (req, res, next) => {
    try {
        if (!roles[req.originalUrl.split('?')[0]].includes(res.locals.user.role)) {
            throw {
                status: 401,
                message: 'Your account is not authorized to do this action'
            }
        }

        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
}

exports.registerValidation = async (req, res, next) => {
    try {
        let { username, password, role } = req.body;
        await registerSchema.validateAsync({ username, password, role })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.loginValidation = async (req, res, next) => {
    try {
        let { username, password } = req.body;
        await loginSchema.validateAsync({ username, password })

        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


