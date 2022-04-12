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
db.comment = require('../models/commentModel.js')(sequelize, Sequelize)

db.article.hasMany(db.comment, {
  foreignKey: 'article_id',
  as: 'comment',
})

db.comment.belongsTo(db.article, {
  foreignKey: 'article_id',
  as: 'article',
  onDelete: 'cascade',
})

module.exports = db
