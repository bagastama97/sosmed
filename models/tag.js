"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.Post);
      Tag.hasMany(models.Like);
      // define association here
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Tag name tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Tag name tidak boleh kosong"
          }
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Price tidak boleh kosong"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
