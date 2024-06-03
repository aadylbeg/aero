"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Files extends Model {
		static associate() {}
	}
	Files.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			originalName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			fileName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			extension: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			mimeType: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			size: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			underscored: true,
			tableName: "files",
			modelName: "Files",
		}
	);

	return Files;
};
