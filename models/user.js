module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'volunteer', 'donor'),
      allowNull: false,
      defaultValue: 'donor'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true // Make phone number unique
    }
  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    User.hasMany(models.FoodDistribution, {
      foreignKey: 'distributed_by',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return User;
};
