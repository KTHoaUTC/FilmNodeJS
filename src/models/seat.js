'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat.init({
      phongchieu_id: DataTypes.INTEGER,
      seat_type_id: DataTypes.INTEGER,
      row: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,

   
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};