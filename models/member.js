'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      // Member has many Fees
      Member.hasMany(models.Fee, {
        foreignKey: 'memberId',
        as: 'fees' // Optional alias for this relationship
      });
    }
  }
  Member.init({
    gymId: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    cnic: DataTypes.STRING,
    address: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    advance: DataTypes.STRING,
    joiningDate: DataTypes.DATE,
    status: DataTypes.STRING,
    profileImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};