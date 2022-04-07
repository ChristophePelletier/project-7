/*
https://sequelize.org/docs/v6/core-concepts/model-basics/
const Sequelize = require('sequelize')
Models can be defined in two equivalent ways in Sequelize:
-> Calling sequelize.define(modelName, attributes, options)
-> Extending Model and calling init(attributes, options)
*/

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        //11 *********************
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      firstName: { type: Sequelize.STRING, notEmpty: true },
      lastName: { type: Sequelize.STRING, notEmpty: true },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      password: { type: Sequelize.STRING, allowNull: false },
      admin: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    {
      tableName: 'users7',
    }
  )
  return User
}

/*
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Post',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      content: {
        type: DataTypes.STRING(1500),
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  )
*/
