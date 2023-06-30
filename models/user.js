"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
      User.hasMany(models.Like);
      User.hasOne(models.Profile)

      // define association here
    }
    static bekrip(passwordUser, passwordDb) {
      return bcrypt.compareSync(passwordUser, passwordDb)
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Name tidak boleh kosong"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Email tidak boleh kosong"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong"
          },
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong"
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Pick a role"
          },
          notNull: {
            args: true,
            msg: "Pick a role"
          }
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
    );
    {
      User.beforeCreate((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash
      });
    }

  return User;
};
