"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Post);
      Like.belongsTo(models.User);
      Like.belongsTo(models.Tag);
      // define association here
    }
  }
  Like.init(
    {
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
