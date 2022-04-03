module.exports = {
  port: 3000,
  db: {
    database: process.env.DB_NAME || 'nomdatabaseàdéterminer',
    user: process.env.DB.USER || 'nomdatabaseàdéterminer',
    password: process.env.DB_PASSWORD || 'nomdatabaseàdéterminer',
    options: {},
  },
}
