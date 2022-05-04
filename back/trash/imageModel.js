// méthode :
//https://www.bezkoder.com/node-js-upload-image-mysql/

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB('long'),
    },
  })
  return Image
}
