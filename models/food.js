module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    food_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    donor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Donors',
        key: 'donor_id'
      }
    }
  });

  Food.associate = function (models) {
    Food.belongsTo(models.Donor, { foreignKey: 'donor_id' });
  };

  return Food;
};

