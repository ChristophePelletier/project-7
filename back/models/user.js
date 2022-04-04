/* https://sequelize.org/docs/v6/core-concepts/model-basics/
const Sequelize = require('sequelize')
Models can be defined in two equivalent ways in Sequelize:
-> Calling sequelize.define(modelName, attributes, options)
-> Extending Model and calling init(attributes, options)
*/
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Post',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      content: {
        type: DataTypes.STRING(1500),
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  )
