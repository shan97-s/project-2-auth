'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lesson.belongsTo(models.user)
    }
  }
  lesson.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    desc: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    usertype: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};