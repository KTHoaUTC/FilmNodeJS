"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("show_time", {

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
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      money: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("show_time");
  },
};
