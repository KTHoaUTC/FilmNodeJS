"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Show_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Show_Time.init(
    {
      movie_id: DataTypes.INTEGER,
      theater_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      money: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Show_Time",
    }
  );
  return Show_Time;
};
