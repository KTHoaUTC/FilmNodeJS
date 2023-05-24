"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movie_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      theater_id: {
        type: Sequelize.INTEGER,
      },
      show_time_id: {
        type: Sequelize.INTEGER,
      },
      seat_id: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        get() {
          const value = this.getDataValue("seat_id");
          return value ? JSON.parse(value) : null;
        },
        set(value) {
          this.setDataValue("seat_id", value ? JSON.stringify(value) : null);
        },
      },
      booking_time: {
        type: Sequelize.DATE,
      },
      booking_status: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      payment_status: {
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
