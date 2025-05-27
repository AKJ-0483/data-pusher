const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Account = require("./account")(sequelize, Sequelize);
db.Destination = require("./destination")(sequelize, Sequelize);

db.Account.hasMany(db.Destination, { onDelete: "CASCADE" });
db.Destination.belongsTo(db.Account);

module.exports = db;
