const db = require("../config/db");

// POST /api/events
const recordEvent = (req, res) => {
  const { videoId, eventType } = req.body;

  const allowedEvents = ["view", "click", "add_to_cart"];

  // Validation
  if (!videoId || !eventType) {
    return res.status(400).json({
      success: false,
      message: "videoId and eventType are required",
    });
  }

  if (!allowedEvents.includes(eventType)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid eventType. Allowed values: view, click, add_to_cart",
    });
  }

  const timestamp = new Date().toISOString();

  const sql = `
    INSERT INTO EngagementEvents
      (videoId, eventType, timestamp)
    VALUES
      (?, ?, ?)
  `;

  db.run(sql, [videoId, eventType, timestamp], function (err) {
    if (err) {
      console.error("Error recording event:", err.message);

      return res.status(500).json({
        success: false,
        message: "Failed to record event",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Event recorded successfully",
      data: {
        id: this.lastID,
        videoId,
        eventType,
        timestamp,
      },
    });
  });
};

// GET /api/analytics/videos
const getAnalytics = (req, res) => {
  let { limit = 10, offset = 0 } = req.query;

  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  // Validate pagination
  if (isNaN(limit) || limit <= 0) {
    limit = 10;
  }

  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  const sql = `
    SELECT
      v.id,
      v.productId,
      v.videoUrl,
      v.title,

      COUNT(CASE
        WHEN e.eventType = 'view'
        THEN 1
      END) AS views,

      COUNT(CASE
        WHEN e.eventType = 'click'
        THEN 1
      END) AS clicks,

      COUNT(CASE
        WHEN e.eventType = 'add_to_cart'
        THEN 1
      END) AS conversions

    FROM Videos v

    LEFT JOIN EngagementEvents e
      ON v.id = e.videoId

    GROUP BY
      v.id,
      v.productId,
      v.videoUrl,
      v.title

    ORDER BY v.id

    LIMIT ? OFFSET ?
  `;

  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      console.error("Error fetching analytics:", err.message);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch analytics",
      });
    }

    return res.status(200).json({
      success: true,
      pagination: {
        limit,
        offset,
      },
      data: rows,
    });
  });
};

module.exports = {
  recordEvent,
  getAnalytics,
};