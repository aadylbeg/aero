const { sequelize, Users, Sessions } = require("../models");

(async () => {
  try {
    await Sessions.sync({ alter: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
