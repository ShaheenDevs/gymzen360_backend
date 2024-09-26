'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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