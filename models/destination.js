module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define("Destination", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    AccountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Destination;
};
