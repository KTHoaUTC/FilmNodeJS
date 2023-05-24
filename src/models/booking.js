"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      user_id: DataTypes.INTEGER,
      movie_id: DataTypes.INTEGER,
      theater_id: DataTypes.INTEGER,
      show_time_id: DataTypes.INTEGER,
      // int4range

      seat_id: DataTypes.ARRAY(DataTypes.INTEGER), // Sửa thành kiểu dữ liệu JSON
      booking_time: DataTypes.DATE,
      booking_status: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      payment_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
