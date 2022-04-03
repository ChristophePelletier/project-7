// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      // Model attributes are defined here
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  )
