module.exports = function (sequelize, Sequelize) {
  const Comment = sequelize.define(
    'comment',
    {
      title: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      userId: { type: Sequelize.INTEGER },
    },
    {
      tableName: 'comments',
    }
  )

  return Comment
}
