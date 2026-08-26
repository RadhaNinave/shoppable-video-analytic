# Shoppable Video Analytics Dashboard

A full-stack web application designed to monitor video engagement and conversion performance. Built with React and Node.js, this dashboard aggregates and displays interaction metrics (views, clicks, and add-to-carts) for shoppable video content.

## 🎥 Video Deliverables

*   **30-Second Pitch:** https://youtube.com/shorts/JPKoZGaG2lg
*   **Technical Walkthrough:** https://www.loom.com/share/39a3e1c416144e15b6fa1cd97c5fa61c

*(Note: My iterative development process and prompts are documented in `AI_PROMPTING.md`).*

---

## 🛠️ Tech Stack

*   **Frontend:** React.js, CSS Modules
*   **Backend:** Node.js, Express.js
*   **Database:** SQLite3

---

## 🚀 Setup & Installation

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/RadhaNinave/shoppable-video-analytic.git
cd shoppable-video-analytic

Public Github link : https://github.com/RadhaNinave
\`\`\`

### 2. Backend Setup
Navigate to the backend directory, install dependencies, seed the database, and start the server:
\`\`\`bash
cd backend
npm install
node seed.js     # Run the seed file first!
node server.js   # Then start the server

\`\`\`

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the React app:
\`\`\`bash
cd frontend
npm install
npm run dev        # Or 'npm run dev' depending on your bundler (runs on http://localhost:3000)
\`\`\`

---

##  Architectural Decisions

### 1. Server-Side Aggregation (Backend)
To handle dense data sets efficiently, the aggregation of metrics is offloaded directly to the SQLite database. The `GET /api/analytics/videos` endpoint utilizes a `LEFT JOIN` across the Videos, Products, and EngagementEvents tables. It leverages `COUNT(CASE WHEN...)` to natively count views, clicks, and conversions in a single, highly performant query before sending the data to the client.

### 2. Client-Side Conversion Math (Frontend)
While raw counts are handled by the server, the percentage-based Conversion Rate is calculated dynamically on the client side. This reduces computational overhead on the backend and allows the UI to render the math instantly.

### 3. Strict CSS Modules (UI/UX)
The frontend utilizes CSS Modules to prevent global scope pollution and ensure clean, maintainable styles. The data table utilizes a `table-layout: fixed` approach to mathematically guarantee equal column distribution regardless of the underlying data size, ensuring a crisp, responsive layout.

---

## 📡 API Reference

### `GET /api/analytics/videos`
Fetches a paginated list of videos along with their aggregated engagement metrics.
*   **Query Parameters:** `limit` (default 10), `offset` (default 0)
*   **Returns:** Pagination data and an array of video objects (views, clicks, conversions).

### `POST /api/events`
Records a new user interaction for a specific video.
*   **Body:** `{ "videoId": 1, "eventType": "view" | "click" | "add_to_cart" }`
*   **Returns:** The recorded event object and a 201 Created status.

---
**Author:** Radha Parmar