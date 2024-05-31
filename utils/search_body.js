const { Op } = require("sequelize");

exports.search_by_name = (keyword) => {
  return {
    [Op.or]: [
      {
        nameTm: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        nameRu: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    ],
  };
};

exports.search_news = (keyword) => {
  return {
    [Op.or]: [
      {
        titleTm: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        titleRu: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        textTm: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        textRu: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    ],
  };
};

exports.search_user = (keyword) => {
  return {
    [Op.or]: [
      {
        email: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        username: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    ],
  };
};
