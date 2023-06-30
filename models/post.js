"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Like);
      Post.belongsTo(models.Tag);
      // define association here
    }
    
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Post title tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Post title tidak boleh kosong"
          }
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Content text tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Content text tidak boleh kosong"
          }
        }
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Masukan gambar anda"
          },
          notNull: {
            args: true,
            msg: "Masukan gambar anda"
          }
        }
      },
      TagId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
