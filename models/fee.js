'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    static associate(models) {
      // Fee belongs to a single Member
      Fee.belongsTo(models.Member, {
        foreignKey: 'memberId',
        as: 'member' // Optional alias for this relationship
      });
    }
  }
  Fee.init({
    gymId: DataTypes.STRING,
    memberId: DataTypes.STRING,
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