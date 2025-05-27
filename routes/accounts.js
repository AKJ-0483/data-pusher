const express = require("express");
const router = express.Router();
const { Account } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { email, name, website } = req.body;
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    const account = await Account.create({ email, name, website });
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const { email, name, website } = req.body;
    await account.update({ email, name, website });

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    await account.destroy();
    res.json({ message: "Account and its destinations deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
