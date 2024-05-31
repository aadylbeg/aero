const { sequelize } = require("../models");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
