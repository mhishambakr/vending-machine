module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Products", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        amountAvailable: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    }, {
        paranoid: true,
        deletedAt: 'destroyTime'
    });
    return Product;
};