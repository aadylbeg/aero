const { sequelize, Files, Sessions } = require("../models");

(async () => {
  try {
    await Files.sync({ force: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
