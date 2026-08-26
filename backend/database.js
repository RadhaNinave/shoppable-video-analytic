const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  // Enable foreign key constraints
  db.run("PRAGMA foreign_keys = ON");

  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Videos table
  db.run(`
    CREATE TABLE IF NOT EXISTS Videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      videoUrl TEXT NOT NULL,
      title TEXT NOT NULL,
      FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
    )
  `);

  // EngagementEvents table
  db.run(`
    CREATE TABLE IF NOT EXISTS EngagementEvents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      videoId INTEGER NOT NULL,
      eventType TEXT NOT NULL CHECK (
        eventType IN ('view', 'click', 'add_to_cart')
      ),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (videoId) REFERENCES Videos(id) ON DELETE CASCADE
    )
  `);

  console.log("Tables are ready.");
});

module.exports = db;