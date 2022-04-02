const { DB, USER, PASSWORD, HOST, dialect } = require('../../config/db.config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: dialect,
        operatorsAliases: 'false',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
)

let User = require("./User.model")(sequelize, Sequelize);
let Product = require("./Product.model")(sequelize, Sequelize);
let Purchase = require("./Purchase.model")(sequelize, Sequelize);

User.hasMany(Purchase, {
    foreignKey: 'buyerId'
});
Purchase.belongsTo(User, {
    foreignKey: 'buyerId'
});

Product.hasMany(Purchase, {
    foreignKey: 'productId'
});
Purchase.belongsTo(Product, {
    foreignKey: 'productId'
});

User.hasMany(Product, {
    foreignKey: 'sellerId'
});
Product.belongsTo(User, {
    foreignKey: 'sellerId'
});

module.exports = {
    sequelize,
    User,
    Product,
    Purchase
}
