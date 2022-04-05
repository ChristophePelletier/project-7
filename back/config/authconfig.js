// https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/
//we export configuring parameters for MySQL connection & Sequelize

module.exports = {
  HOST: 'localhost',
  USER: 'Christophe_Pelletier',
  PASSWORD: '87420_Mysql',
  DB: 'test',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

/*
const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'Christophe_Pelletier', '87420_Mysql', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = sequelize
global.sequelize = sequelize

*/
