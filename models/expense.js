'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expense.init({
    gymId: DataTypes.STRING,
    title: DataTypes.STRING,
    amount: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};