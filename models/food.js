const { Sequelize, DataType } = require("sequelize");
const Donor = require('./donor');
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const food = sequelize.define('Food',
    {
        food_item_id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        category: {
            type: DataType.STRING,
            allowNull: false
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false
        },
        unit: {
            type: DataType.STRING,
            allowNull: false
        },
        expiration_date: {
            type: DataType.DATE,
            allowNull: false
        },
        received_date: {
            type: DataType.DATE,
            allowNull: false
        },
        donor_id: {
            type: DataType.INTEGER,
            references: {
                model: Donor,
                key: 'donor_id'
            }
        }
    }
);

module.exports = food;
