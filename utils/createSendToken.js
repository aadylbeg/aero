const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { Sessions } = require("../models");

const signToken = (user) => {
  let jwtData = {
    id: user.id,
    uuid: user.uuid,
    email: user.name,
    phone: user.surname,
  };

  return jwt.sign(jwtData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "10m",
  });
};

exports.createSendToken = async (user) => {
  let token = signToken(user);

  let refreshToken = uuid.v4();

  await Sessions.create({ uuid: refreshToken, userId: user.id });
  return { token, refreshToken };
};
