module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define(
    'user',
    {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      firstName: { type: Sequelize.STRING, notEmpty: true },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      password: { type: Sequelize.STRING, allowNull: false },
      admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      tableName: 'users101',
    }
  )
  return User
}
