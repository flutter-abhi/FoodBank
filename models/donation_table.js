module.exports = (sequelize, DataTypes) => {
  const DonationTable = sequelize.define('DonationTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    donar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Donors',
        key: 'donor_id'
      }
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Food',
        key: 'food_item_id'
      }
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  DonationTable.associate = function(models) {
    DonationTable.belongsTo(models.Donor, { foreignKey: 'donar_id' });
    DonationTable.belongsTo(models.Food, { foreignKey: 'food_id' });
  };

  return DonationTable;
};

