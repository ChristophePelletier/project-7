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

//à supprimer en cas de bug pour revenir à du non relationnel
// penser alor à remettre articleId dans le commentModel...
db.article.hasMany(db.comment, {
  as: 'comments',
  onDelete: 'cascade',
})

db.comment.belongsTo(db.article, {
  foreignKey: 'articleId',
  as: 'articles',
  onDelete: 'cascade',
})

db.user.hasMany(db.article, {
  as: 'articles',
})

db.article.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'users',
  onDelete: 'cascade',
})

db.user.hasMany(db.comment, {
  as: 'comments',
})

db.comment.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'users',
  onDelete: 'cascade',
})

module.exports = db
