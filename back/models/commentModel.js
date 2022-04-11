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
      com: {
        type: DataTypes.INTEGER,
        references: {
          model: 'articles',
          foreignKey: 'com',
        },
      },
    },
    {
      tableName: 'comments',
    }
  )
  return Comment
}
