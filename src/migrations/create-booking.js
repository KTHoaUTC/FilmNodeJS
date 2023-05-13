"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("booking", {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movie_id: {
        type: Sequelize.INTEGER,
      },
      theater_id: {
        type: Sequelize.INTEGER,
      },
      show_time_id: {
        type: Sequelize.INTEGER,
      },
      seat_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("booking");
  },
};
