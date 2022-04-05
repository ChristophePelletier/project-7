const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'Christophe_Pelletier', '87420_Mysql', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = sequelize
global.sequelize = sequelize
