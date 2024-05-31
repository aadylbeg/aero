require("dotenv").config({ path: "./.env" });
const { sequelize } = require("./models");

const server = require("./app").listen(3223, async () => {
  await sequelize.authenticate();
  console.log(`Connected to DB and listening on port 3223...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
