const joi = require('joi')


exports.registerSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),

    password: joi.string().min(8).required(),

    role: joi.string().valid('seller', 'buyer').required(),

    // deposit: joi.number().min(0).required()
})

exports.loginSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),

    password: joi.string().min(8).required()
})

exports.authSchema = joi.object({
    token: joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
})

exports.editSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),

    password: joi.string().min(8).required(),

    role: joi.string().valid('seller', 'buyer').required(),
})

exports.depositSchema = joi.object({
    amount: joi.number().valid(5, 10, 20, 50, 100).required()
})

exports.deleteSchema = joi.object({
    id: joi.number().integer().positive().required()
})

exports.restoreSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),
})


