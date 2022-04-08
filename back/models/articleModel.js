module.exports = function (sequelize, Sequelize) {
  const Article = sequelize.define(
    'article',
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      articleId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: { type: Sequelize.STRING, notEmpty: true },
      content: { type: Sequelize.STRING, notEmpty: true },
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
