const { Sequelize, DataType } = require("sequelize");
const Food = require('./food');
const User = require('./users');
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


const InventoryTransactions = sequelize.define('inventory_transactions', {
    transaction_id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    food_item_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: 'food_item_id'
        }
    },
    //user which resposible for the transaction
    user_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    // add or remove food item
    transaction_type: {
        type: DataType.STRING,
        allowNull: false
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    transaction_date: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    }
});

module.exports = InventoryTransactions;