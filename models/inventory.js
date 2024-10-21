module.exports = (sequelize, DataTypes) => {
  const InventoryTransactions = sequelize.define('inventory_transactions', {
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    food_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Food',
        key: 'food_item_id'
      }
    },
    
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  InventoryTransactions.associate = function(models) {
    InventoryTransactions.belongsTo(models.Food, { foreignKey: 'food_item_id' });
    InventoryTransactions.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return InventoryTransactions;
};

