"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhongChieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhongChieu.init(
    {
      theater_id: DataTypes.INTEGER,
      seat_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      sum_seat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PhongChieu",
    }
  );
  return PhongChieu;
};
