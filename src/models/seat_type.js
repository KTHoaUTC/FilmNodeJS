'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat_Type.init({
      name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Seat_Type',
  });
  return Seat_Type;
};