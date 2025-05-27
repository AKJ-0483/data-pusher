const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    accountId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appSecretToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => crypto.randomBytes(32).toString("hex"),
    },
  });

  return Account;
};
