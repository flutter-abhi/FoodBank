module.exports = (sequelize, DataTypes) => {
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

  Donor.associate = function (models) {
    Donor.hasMany(models.Food, { foreignKey: 'donor_id' });
  };

  return Donor;
};

