const express = require("express");
// const AppError = require("./utils/appError");
const app = express();

// app.use(require("cors")());
// app.use(require("body-parser").json());
// app.use(require("xss-clean")());
// app.use(require("cookie-parser")());
// app.use(require("morgan")("dev"));

app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1/admins", require("./routes/admin/adminsRouter"));
// app.use("/api/v1/public", require("./routes/public/public"));
// app.use("/api/v1/users", require("./routes/users/users"));
app.use(express.static(`${__dirname}/public`));

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });
// app.use(require("./controllers/errController"));

module.exports = app;
