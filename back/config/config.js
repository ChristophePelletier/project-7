module.exports = {
  hostname: 'localhost',
  user: 'Christophe_Pelletier',
  password: '87420_Mysql',
  database: 'test',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
