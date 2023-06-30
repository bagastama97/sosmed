'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    dateFormat(){
      const year = this.birthDate.getFullYear()
      const month = this.birthDate.getMonth() + 1 < 10 ? `0${this.birthDate.getMonth() + 1}` : this.birthDate.getMonth() + 1
      const date = this.birthDate.getDate() < 10 ? `0${this.birthDate.getDate()}` : this.birthDate.getDate()
      return `${year}-${month}-${date}`
      
    }


  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};