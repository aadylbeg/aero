"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    static associate({ Users }) {
      this.belongsTo(Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Sessions.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "sessions",
      modelName: "Sessions",
    }
  );
  return Sessions;
};
