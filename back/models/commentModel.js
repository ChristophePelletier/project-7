module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      title: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      art_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'articles',
          key: 'articleId',
        },
      },
    },
    {
      tableName: 'comments',
    }
  )
  return Comment
}
