const { Op } = require("sequelize");
const models = require("../models");

exports.news_includes = () => {
  return [
    {
      model: models.Categories,
      as: "category",
      attributes: { exclude: [] },
      where: {},
      required: false,
    },
    {
      model: models.Tags,
      as: "tags",
      through: { attributes: [] },
      attributes: { exclude: [] },
      where: {},
      required: false,
    },
  ];
};

exports.comments_includes = () => {
  return [
    {
      model: models.News,
      as: "news",
      where: { deletedAt: null },
      attributes: {
        exclude: [
          "contextImages",
          "textTm",
          "textRu",
          "updatedAt",
          "view",
          "like",
          "createdAt",
          "deletedAt",
        ],
      },
      required: false,
    },
    {
      model: models.Users,
      as: "user",
      attributes: ["uuid", "username", "isActive"],
    },
    // {
    //   model: models.Admins,
    //   as: 'admin',
    //   attributes: ['uuid', 'username', 'isActive'],
    // },
    {
      model: models.Comments,
      as: "childs",
      where: { adminId: null },
      attributes: ["uuid", "text", "canPublish"],
      required: false,
    },
    {
      model: models.Comments,
      as: "parent",
      attributes: ["uuid", "text", "canPublish"],
    },
  ];
};

exports.comment_includes = () => {
  return [
    {
      model: models.Users,
      as: "user",
      where: {},
      attributes: ["uuid", "username", "isBlocked"],
      required: false,
    },
    {
      model: models.Admins,
      as: "admin",
      where: {},
      attributes: ["uuid", "username", "isBlocked"],
      required: false,
    },
  ];
};
