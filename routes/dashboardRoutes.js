const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/dashboard", auth, async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    const activeUsers = users.length;
    const projects = Math.floor(activeUsers * 1.4);
    const revenue = activeUsers * 85;

    res.json({ activeUsers, revenue, projects, users });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;