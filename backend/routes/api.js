const express = require("express");

const {
  recordEvent,
  getAnalytics,
} = require("../controllers/eventController");

const router = express.Router();

// Event routes
router.post("/events", recordEvent);

// Analytics routes
router.get("/analytics/videos", getAnalytics);

module.exports = router;