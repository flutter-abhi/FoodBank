module.exports = (sequelize, DataTypes) => {
  const FoodDistribution = sequelize.define('FoodDistribution', {
    distribution_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    food_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Food',
        key: 'food_item_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    distribution_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    distributed_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  });

  FoodDistribution.associate = function(models) {
    FoodDistribution.belongsTo(models.Food, { foreignKey: 'food_item_id' });
    FoodDistribution.belongsTo(models.User, { foreignKey: 'distributed_by', as: 'distributor' });
  };

  return FoodDistribution;
};
