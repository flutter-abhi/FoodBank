// models/users.js

const { Sequelize, DataTypes } = require('sequelize');

// Create a connection to the database
const sequelize = new Sequelize('food_bank_inventory', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the User model
module.exports = User;

