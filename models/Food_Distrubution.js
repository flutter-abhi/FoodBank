const { Sequelize, DataType } = require("sequelize");
const User = require('./users');
const Food = require('./food');
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Food_Distrubution = sequelize.define('Food_Distrubution', {
    distribution_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipient_name: {
        type: DataType.STRING,
        allowNull: false
    },
    food_item_id: {
        type: DataType.INTEGER,
        references: {
            model: Food,
            key: 'food_item_id' // Assuming you have a Food_Items table
        }
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    distribution_date: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    distributed_by: {
        type: DataType.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Food_Distrubution;
