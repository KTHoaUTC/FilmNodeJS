"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("seat", {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theater_id: {
        type: Sequelize.INTEGER,
      },
      seat_type_id: {
        type: Sequelize.INTEGER,
      },
      row: {
        type: Sequelize.INTEGER,
      },
     
      status: {
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
    await queryInterface.dropTable("seat");
  },
};
