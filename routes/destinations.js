const express = require("express");
const router = express.Router();
const { Destination, Account } = require("../models");

router.post("/:accountId/destinations", async (req, res) => {
  try {
    const { accountId } = req.params;
    const { url, method, headers } = req.body;

    if (!url || !method || !headers) {
      return res
        .status(400)
        .json({ message: "url, method and headers are required" });
    }

    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const destination = await Destination.create({
      url,
      method,
      headers,
      AccountId: accountId,
    });

    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:accountId/destinations", async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      where: { AccountId: req.params.accountId },
    });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    const { url, method, headers } = req.body;
    await destination.update({ url, method, headers });

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    await destination.destroy();
    res.json({ message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
