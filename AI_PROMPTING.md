## 1. Database Schema & Seed Script
* **Tool Used:** ChatGPT 
* **The Context/Task:** Setting up the SQLite tables and generating mock data for immediate API testing.
* **Exact Prompt Used:** Act as a senior database architect. I am building a Node.js/Express backend using sqlite3. Write the code for two files:

database.js: Connects to a local SQLite database file named database.sqlite and creates three tables if they don't exist: Products (id, name, price, createdAt), Videos (id, productId, videoUrl, title), and EngagementEvents (id, videoId, eventType ['view', 'click', 'add_to_cart'], timestamp).

seed.js: A script that imports the database connection, clears existing data, and inserts 3 mock products, 5 mock videos, and 50 random engagement events. Use raw SQL queries.
* **Outcome & Adjustments:** The AI generated the schema and seed script successfully. (Will update if any manual SQL adjustments were required).

## 2. Modular Backend Architecture & API Endpoints
* **Tool Used:** ChatGPT
* **The Context/Task:** Building the REST API endpoints. I decided to enforce a modular architecture (routes, controllers, config) rather than putting everything in server.js to maintain a clean codebase.
* **Exact Prompt Used:** "Act as a senior backend architect. I am building a Node.js/Express backend with sqlite3 for a Shoppable Video Analytics system. I want a clean, modular architecture.

Please generate the code for these 4 distinct files:

config/db.js: Establish and export the SQLite database connection.

controllers/eventController.js: Create and export two controller functions:

recordEvent: Handles POST /api/events (inserts videoId, eventType ['view', 'click', 'add_to_cart'], and timestamp).

getAnalytics: Handles GET /api/analytics/videos. Uses a SQL LEFT JOIN and conditional aggregation (COUNT(CASE...)) to return video details, views, clicks, and conversions. Includes pagination (limit and offset).

routes/api.js: Set up the Express router, import the controller functions, and define the POST /events and GET /analytics/videos routes.

server.js: Initialize Express, apply JSON parsing and CORS middleware, mount the routes from api.js at /api, and start the server on port 5000."
* **Outcome & Adjustments:** The AI successfully generated separated concerns. I reviewed the exported modules to ensure the Express router was correctly mounted in server.js.

## 3. React Frontend & Client-Side Logic
* **Tool Used:** ChatGPT
* **The Context/Task:** Building the interactive React dashboard, calculating the conversion rate metric on the frontend, and simulating webhook traffic[cite: 1].
* **Exact Prompt Used:** "Act as a senior React developer. I am building a Shoppable Video Analytics Dashboard. I must adhere strictly to standard CSS Modules (NO Tailwind CSS). Generate clean, production-ready code for these files:src/components/AnalyticsTable.jsx: Renders a data table showing Video Title, Product, Views, Clicks, and Add to Carts. Calculate a 'Conversion Rate' column on the client side using the formula: $\frac{\text{Add to Carts}}{\text{Views}} \times 100$. Handle zero-division safely.  src/components/TrafficSimulator.jsx: A component with a 'Simulate Traffic' button. When clicked, it randomly picks a video ID and event type, sends a POST to http://localhost:5000/api/events, and triggers a callback to refresh the table.  src/components/Dashboard.jsx: Manages state, fetches data from GET http://localhost:5000/api/analytics/videos, handles basic pagination, and renders the table and simulator.  src/components/Dashboard.module.css: Modern, responsive CSS for the layout."
* **Outcome & Adjustments:** The AI generated the modular React components. I ensured that utility-class frameworks were avoided in favor of CSS Modules.

## 4. UI/UX Polish & Modernizing CSS Modules
* **Tool Used:** ChatGPT
* **The Context/Task:** The initial UI was functional but lacked contrast (invisible header text) and polish. I needed to upgrade the aesthetics to a modern SaaS look while strictly adhering to the "No Tailwind CSS" constraint[cite: 1].
* **Exact Prompt Used:** "Act as a senior UI/UX designer and frontend developer. I am building a React dashboard using strict CSS Modules (Absolutely NO Tailwind CSS or utility classes). I have a working UI, but it currently looks very basic.

Please rewrite my Dashboard.module.css file to look like a modern, premium B2B SaaS platform.

Specific Design Requirements:

Color Palette: Use a clean, professional blue for the primary accents (like the 'Simulate Traffic' button and active pagination states), set against a crisp white dashboard card and a very soft, light-gray page background.

Typography & Contrast: Ensure the main header ('Shoppable Video Analytics') is dark and highly legible. Add a subtle, muted color for the subtitle.

The Data Table: Left-align the text in the 'Video Title' and 'Product' columns for readability, and center the metrics. Add a distinct bottom border to the <thead>. Implement a subtle, light-gray hover effect (:hover) on the table rows.

Buttons: Make the 'Simulate Traffic' button look clickable and modern. Give it rounded corners (e.g., 8px), a bold blue background, white text, no border, a subtle box-shadow, and a smooth transform: translateY(-1px) hover effect.

Pagination: Style the Next/Previous buttons cleanly. They should look like secondary outlines, while the active page number is clear.

Provide the complete CSS code."
* **Outcome & Adjustments:** The AI provided a highly polished CSS Module. I applied a professional blue primary color scheme, added row hover effects to the table, and fixed the header contrast issues.