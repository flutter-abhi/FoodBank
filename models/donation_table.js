
const Donor = require('./donor');
const Food = require('./food');
const { Sequelize, DataType } = require("sequelize");
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const donation_table = sequelize.define('donation_table', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    donar_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Donor,
            key: 'donor_id'
        }
    },
    food_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: 'food_item_id'
        }
    },
    donation_date: {
        type: DataType.DATE,
        allowNull: false
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false
    }
}

);

module.exports = donation_table;