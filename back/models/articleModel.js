module.exports = function (sequelize, Sequelize) {
  const Article = sequelize.define(
    'article',
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: '1',
      },
      articleId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      articleIllustration: { type: Sequelize.STRING },
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
