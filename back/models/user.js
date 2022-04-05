/* https://sequelize.org/docs/v6/core-concepts/model-basics/
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
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstName: { type: Sequelize.STRING, notEmpty: true },
      lastName: { type: Sequelize.STRING, notEmpty: true },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    {
      tableName: 'users',
    }
  )
  return User
}

/*
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword,
      },
    }
  )

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {}

  return User
}


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
