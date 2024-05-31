const AppError = require("../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
const catchAsync = require("../utils/catchAsync");
const { createSendToken } = require("./../utils/createSendToken");

exports.protect = catchAsync(async (req, res, next) => {
  let token,
    auth = req?.headers?.authorization;
  if (auth?.startsWith("Bearer")) token = auth.split(" ")[1];
  if (!token) return next(new AppError("You are not logged in!", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await Users.findOne({ where: { uuid: decoded.uuid } });
  if (!freshUser)
    return next(new AppError("The user is no longer exists", 401));

  req.user = freshUser;
  next();
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  let { refreshToken } = req.body;
  if (!refreshToken || typeof refreshToken !== "string")
    return next(new AppError("Invalid Credentials", 400));

  let token,
    auth = req.headers.authorization;
  if (auth?.startsWith("Bearer")) token = auth.split(" ")[1];
  if (!token) return next(new AppError("You are not logged in", 401));

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      decoded = jwt.decode(token);
    } else {
      return next(new AppError("Invalid token", 401));
    }
  }

  const user = await Users.findOne({
    where: {
      uuid: decoded.uuid,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: "Failed",
      message: "Invalid token",
    });
  }

  if (user.refreshToken !== refreshToken) {
    return res.status(409).json({
      status: "fail",
      message: "Someone has logged to your account",
    });
  }

  let { token: t, refreshToken: rt } = await createSendToken(user);

  return res.status(200).json({ token: t, refreshToken: rt });
});

exports.login = catchAsync(async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password)
    return next(new AppError("Provide id and password", 400));

  const user = await Users.findOne({
    where: { [Op.or]: [{ email: id }, { phone: id }] },
  });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("Incorrect id or password", 400));

  let { token: t, refreshToken: rt } = await createSendToken(user);
  return res.status(200).json({ token: t, refreshToken: rt });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, phone, password } = req.body;

  if (!email || !phone || !password || password.length < 5)
    return next(new AppError("Invalid Credentials", 400));

  const newUser = await Users.create({ email, password, phone });
  let { token: t, refreshToken: rt } = await createSendToken(newUser);

  return res.status(200).json({ token: t, refreshToken: rt });
});
