'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
 
    static associate(models) {
      // define association here
    }
  }
  Movies.init(
    {
      title: DataTypes.STRING,
      genres_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      countries: DataTypes.STRING,
      poster_url: DataTypes.STRING,
      trailer_url: DataTypes.STRING,
      image_url: DataTypes.STRING,
      release_date: DataTypes.STRING,
      run_time: DataTypes.INTEGER,
      director: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movies",
    }
  );
  return Movies;
};