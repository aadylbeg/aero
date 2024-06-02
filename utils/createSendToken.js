const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (user) => {
  let jwtData = {
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
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await user.update({ refreshToken: hashedRefreshToken });

  return { token, refreshToken };
};
