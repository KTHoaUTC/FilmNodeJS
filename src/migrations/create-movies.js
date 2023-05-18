'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      genres_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      countries: {
        type: Sequelize.STRING,
      },
      poster_url: {
        type: Sequelize.STRING,
      },
      trailer_url: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      release_date: {
        type: Sequelize.STRING,
      },
      run_time: {
        type: Sequelize.INTEGER,
      },
      director: {
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
    await queryInterface.dropTable('Movies');
  }
};