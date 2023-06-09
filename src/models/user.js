'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    pass_word: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,

    gender: DataTypes.BOOLEAN,
    RoleId:DataTypes.STRING,
    image: DataTypes.STRING
   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};