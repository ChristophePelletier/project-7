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
      /*
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      */
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'comments',
    }
  )

  return Comment
}
