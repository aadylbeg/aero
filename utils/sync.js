const { sequelize, Sessions } = require("../models");

(async () => {
  try {
    await Sessions.sync({ force: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
