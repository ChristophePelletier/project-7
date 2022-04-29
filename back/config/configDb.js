module.exports = {
  hostname: 'localhost',
  user: process.env.DATABASEUSER,
  password: process.env.DATABASEPASSWORD,
  database: process.env.DATABASE,
  // to replace by database : process.env.DB_NAME || nom par défaut
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
