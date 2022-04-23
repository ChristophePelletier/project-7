module.exports = function (sequelize, Sequelize) {
  const Comment = sequelize.define(
    'comment',
    {
      //normlament à ne pas mettre...
      articleId: { type: Sequelize.INTEGER },
      //
      title: { type: Sequelize.STRING, default: '' },
      content: { type: Sequelize.STRING, default: '' },
      userId: { type: Sequelize.INTEGER, default: '' },
      email: { type: Sequelize.STRING, default: '' },
      secondName: { type: Sequelize.STRING },
      firstName: { type: Sequelize.STRING, notEmpty: true },
    },
    {
      tableName: 'comments',
    }
  )

  return Comment
}
