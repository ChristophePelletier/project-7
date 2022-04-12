module.exports = function (sequelize, Sequelize) {
  const Article = sequelize.define(
    'article',
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      /*
      articleId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      */
      title: { type: Sequelize.STRING },
      author: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
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
