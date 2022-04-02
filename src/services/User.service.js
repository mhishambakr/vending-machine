const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { secret } = require('../../config/auth.config');

exports.createUser = async ({ username, password, role }) => {
    try {
        let hashedPassword = bcrypt.hashSync(password, 8);

        let [user, created] = await User.findOrCreate({
            where: { username },
            defaults: {
                username,
                role,
                password: hashedPassword
            }
        });

        if (!created) {
            throw {
                status: 409,
                message: 'member with this username already exists',
            }
        }

        let token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400
        });

        return { user, token };
    } catch (err) {
        throw err;
    }
}

exports.loginUser = async ({ username, password }) => {
    try {
        let user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw {
                status: 404,
                message: 'this username doesn\'t exist',
            }
        }

        user = user.get({ plain: true })

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            throw {
                status: 401,
                message: 'wrong password',
            }
        };

        var token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400
        });

        return { token };
    } catch (err) {
        throw err;
    }
}

exports.findAllUsers = async () => {
    try {
        let users = await User.findAndCountAll({
            attributes: ['id', 'username', 'role', 'deposit']
        });

        return users;
    } catch (err) {
        throw err;
    }
}

exports.updateUser = async ({ id, username, password, role }) => {
    try {
        let hashedPassword = bcrypt.hashSync(password, 8);

        let user = await User.update({
            username,
            password: hashedPassword,
            role
        }, {
            where: {
                id
            }
        })

        return { user }
    } catch (err) {
        throw err;
    }
}

exports.deleteUser = async ({ id }) => {
    try {
        let deleted = await User.destroy({
            where: {
                id
            }
        });

        return deleted
    } catch (err) {
        throw err;
    }
}

exports.resotreUser = async ({ username }) => {
    try {
        let user = await User.findOne({
            where: {
                username
            },
            paranoid: false
        });

        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            }
        }

        let restored = await User.restore({
            where: {
                username
            }
        });

        return restored
    } catch (err) {
        throw err;
    }
}

exports.deposit = async ({ userId, amount }) => {
    try {
        let deposit = await User.increment('deposit', { by: amount, where: { id: userId } });

        return deposit;

    } catch (err) {
        throw err;
    }
}

exports.resetDeposit = async ({ userId }) => {
    try {

        let user = await User.update({
            deposit: 0
        }, {
            where: {
                id: userId
            }
        })

        return { user }
    } catch (err) {
        throw err;
    }
}

exports.decrementDeposit = async ({ buyerId, amountOfItems, product }) => {
    try {

        let paid = amountOfItems * product.cost;
        let deposit = await User.decrement('deposit', { by: paid, where: { id: buyerId } });

        return {paid};

    } catch (err) {
        throw err;
    }
}