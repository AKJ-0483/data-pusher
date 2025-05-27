const express = require("express");
const router = express.Router();
const { Account, Destination } = require("../models");
const axios = require("axios");

router.post("/incoming_data", async (req, res) => {
  const token = req.headers["cl-x-token"];
  const data = req.body;

  if (!token) {
    return res.status(401).json({ message: "Un Authenticate" });
  }

  if (!data || typeof data !== "object") {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    const account = await Account.findOne({ where: { appSecretToken: token } });
    if (!account) {
      return res.status(401).json({ message: "Un Authenticate" });
    }

    const destinations = await Destination.findAll({
      where: { AccountId: account.accountId },
    });

    const responses = await Promise.all(
      destinations.map(async (dest) => {
        try {
          const config = {
            method: dest.method.toLowerCase(),
            url: dest.url,
            headers: dest.headers,
          };

          if (config.method === "get") {
            config.params = data;
          } else {
            config.data = data;
          }

          const result = await axios(config);
          return { url: dest.url, status: result.status };
        } catch (err) {
          return { url: dest.url, error: err.message };
        }
      })
    );

    res.json({ message: "Data forwarded", results: responses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
