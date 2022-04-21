module.exports = function (sequelize, Sequelize) {
  const Article = sequelize.define(
    'article',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      title: { type: Sequelize.STRING },
      author: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      tableName: 'articles',
    }
  )
  return Article
}
