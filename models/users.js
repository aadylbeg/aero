"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate() {}
    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
        password: undefined,
        refreshToken: undefined,
      };
    }
  }
  Users.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "users",
      modelName: "Users",
    }
  );

  Users.beforeCreate(async (user, options) => {
    if (user.password) user.password = await bcrypt.hash(user.password, 12);
  });

  return Users;
};
