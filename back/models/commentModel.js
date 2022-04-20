module.exports = function (sequelize, Sequelize) {
  const Comment = sequelize.define(
    'comment',
    {
      //articleId: { type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, default: '' },
      content: { type: Sequelize.STRING, default: '' },
      userId: { type: Sequelize.INTEGER, default: '' },
      email: { type: Sequelize.STRING, default: '' },
    },
    {
      tableName: 'comments',
    }
  )

  return Comment
}
