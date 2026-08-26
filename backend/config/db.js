require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(
  __dirname,
  "..",
  process.env.DB_PATH || "database.sqlite"
);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;