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
      tableName: 'users10',
    }
  )
  return Article
}
