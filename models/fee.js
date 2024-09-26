'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fee.init({
    gymId: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    paymentMethod: DataTypes.STRING,
    privateNote: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};