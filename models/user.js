module.exports = (sequelize, DataTypes) => {
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
    tableName: 'users'
  });

  User.associate = function(models) {
    User.hasMany(models.FoodDistribution, { foreignKey: 'distributed_by' });
  };

  return User;
};
