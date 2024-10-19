const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Donor = sequelize.define('Donor', {
    donor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Donor;
