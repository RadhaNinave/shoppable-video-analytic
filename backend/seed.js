const db = require("./database");

const products = [
  { name: "Wireless Headphones", price: 2999 },
  { name: "Smart Watch", price: 4999 },
  { name: "Bluetooth Speaker", price: 1999 },
  { name: "Power Bank 10000mAh", price: 1299 },
  { name: "Mechanical Keyboard", price: 4599 },
  { name: "Wireless Gaming Mouse", price: 2199 },
  { name: "USB-C Hub", price: 899 },
  { name: "Laptop Desk Stand", price: 1499 },
  { name: "Noise Cancelling Earbuds", price: 3999 },
  { name: "27-inch 4K Monitor", price: 25999 },
];

const videos = [
  { productId: 1, videoUrl: "https://example.com/videos/headphones-1.mp4", title: "Wireless Headphones Overview" },
  { productId: 2, videoUrl: "https://example.com/videos/watch-1.mp4", title: "Smart Watch Features" },
  { productId: 3, videoUrl: "https://example.com/videos/speaker-1.mp4", title: "Bluetooth Speaker Review" },
  { productId: 4, videoUrl: "https://example.com/videos/powerbank-1.mp4", title: "Power Bank Charge Test" },
  { productId: 5, videoUrl: "https://example.com/videos/keyboard-1.mp4", title: "Mechanical Keyboard ASMR" },
  { productId: 6, videoUrl: "https://example.com/videos/mouse-1.mp4", title: "Gaming Mouse Latency Test" },
  { productId: 7, videoUrl: "https://example.com/videos/hub-1.mp4", title: "USB-C Hub Port Breakdown" },
  { productId: 8, videoUrl: "https://example.com/videos/stand-1.mp4", title: "Ergonomic Laptop Stand Setup" },
  { productId: 9, videoUrl: "https://example.com/videos/earbuds-1.mp4", title: "Earbuds Active Noise Cancelling" },
  { productId: 10, videoUrl: "https://example.com/videos/monitor-1.mp4", title: "4K Monitor Color Accuracy" },
];

const eventTypes = ["view", "click", "add_to_cart"];

db.serialize(() => {
  // Clear existing data.
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
    videoStmt.run(video.productId, video.videoUrl, video.title);
  });
  videoStmt.finalize();

  // Insert 50 random engagement events
  const eventStmt = db.prepare(`
    INSERT INTO EngagementEvents (videoId, eventType, timestamp)
    VALUES (?, ?, ?)
  `);

  for (let i = 0; i < 50; i++) {
    const videoId = Math.floor(Math.random() * 10) + 1;
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const timestamp = new Date().toISOString();
    eventStmt.run(videoId, eventType, timestamp);
  }

  eventStmt.finalize(() => {
    console.log("Database seeded successfully!");
    console.log("10 products inserted.");
    console.log("10 videos inserted.");
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