"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShowTime.init(
    {
      movie_id: DataTypes.INTEGER,
      theater_id: DataTypes.INTEGER,
      phongchieu_id: DataTypes.INTEGER,
      ngay_chieu: DataTypes.DATE,
      gio_chieu: DataTypes.DATE,
      money: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShowTime",
    }
  );
  return ShowTime;
};
