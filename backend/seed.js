const db = require("./database");

const products = [
  {
    name: "Wireless Headphones",
    price: 2999,
  },
  {
    name: "Smart Watch",
    price: 4999,
  },
  {
    name: "Bluetooth Speaker",
    price: 1999,
  },
];

const videos = [
  {
    productId: 1,
    videoUrl: "https://example.com/videos/headphones-1.mp4",
    title: "Wireless Headphones Overview",
  },
  {
    productId: 1,
    videoUrl: "https://example.com/videos/headphones-2.mp4",
    title: "Headphones Sound Test",
  },
  {
    productId: 2,
    videoUrl: "https://example.com/videos/watch-1.mp4",
    title: "Smart Watch Features",
  },
  {
    productId: 2,
    videoUrl: "https://example.com/videos/watch-2.mp4",
    title: "Smart Watch Demo",
  },
  {
    productId: 3,
    videoUrl: "https://example.com/videos/speaker-1.mp4",
    title: "Bluetooth Speaker Review",
  },
];

const eventTypes = ["view", "click", "add_to_cart"];

db.serialize(() => {
  // Clear existing data.
  // Delete child tables first because of foreign keys.
  db.run("DELETE FROM EngagementEvents");
  db.run("DELETE FROM Videos");
  db.run("DELETE FROM Products");

  // Reset auto-increment counters
  db.run("DELETE FROM sqlite_sequence WHERE name = 'Products'");
  db.run("DELETE FROM sqlite_sequence WHERE name = 'Videos'");
  db.run("DELETE FROM sqlite_sequence WHERE name = 'EngagementEvents'");

  // Insert products
  const productStmt = db.prepare(`
    INSERT INTO Products (name, price)
    VALUES (?, ?)
  `);

  products.forEach((product) => {
    productStmt.run(product.name, product.price);
  });

  productStmt.finalize();

  // Insert videos
  const videoStmt = db.prepare(`
    INSERT INTO Videos (productId, videoUrl, title)
    VALUES (?, ?, ?)
  `);

  videos.forEach((video) => {
    videoStmt.run(
      video.productId,
      video.videoUrl,
      video.title
    );
  });

  videoStmt.finalize();

  // Insert 50 random engagement events
  const eventStmt = db.prepare(`
    INSERT INTO EngagementEvents (videoId, eventType, timestamp)
    VALUES (?, ?, ?)
  `);

  for (let i = 0; i < 50; i++) {
    const videoId = Math.floor(Math.random() * 5) + 1;

    const eventType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const timestamp = new Date().toISOString();

    eventStmt.run(videoId, eventType, timestamp);
  }

  eventStmt.finalize(() => {
    console.log("Database seeded successfully!");
    console.log("3 products inserted.");
    console.log("5 videos inserted.");
    console.log("50 engagement events inserted.");

    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  });
});