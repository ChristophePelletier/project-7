/*
Models
--> essence of Sequelize
--> an abstraction that represents a table in the database.
In Sequelize, it is a class that extends Model.
*/
const configDb = require('../config/configDb.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  configDb.database,
  configDb.user,
  configDb.password,
  {
    host: configDb.hostname,
    port: configDb.port,
    dialect: configDb.dialect,
    pool: {
      max: configDb.pool.max,
      min: configDb.pool.min,
      acquire: configDb.pool.acquire,
      idle: configDb.pool.idle,
    },
    define: {
      timestamps: true,
    },
  }
)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('../models/userModel.js')(sequelize, Sequelize)
db.article = require('../models/articleModel.js')(sequelize, Sequelize)
module.exports = db
//npx sequelize-cli init
/*
'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
*/
