const { sequelize, Users } = require("../models");

(async () => {
  try {
    await Users.sync({ alter: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
