module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      title: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'comments',
    }
  )
  return Comment
}
