const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const accountRoutes = require("./routes/accounts");
app.use("/accounts", accountRoutes);

const destinationRoutes = require("./routes/destinations");
app.use("/accounts", destinationRoutes);

const incomingRoutes = require("./routes/incoming");
app.use("/server", incomingRoutes);

db.sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
