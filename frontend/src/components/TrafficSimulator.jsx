import React, { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_HOST}/api/events`;

const TrafficSimulator = ({ videos = [], onEventRecorded }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const simulateTraffic = async () => {
    if (videos.length === 0) {
      setMessage("No videos available to simulate traffic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const randomVideo =
        videos[Math.floor(Math.random() * videos.length)];

      const eventTypes = ["view", "click", "add_to_cart"];

      const randomEvent =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: randomVideo.id,
            eventType: randomEvent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to record event");
      }

      setMessage(
        `Recorded "${randomEvent}" for "${randomVideo.title}"`
      );
      setTimeout(() => {
    setMessage('');
  }, 3000);

      // Refresh analytics table
      if (onEventRecorded) {
        onEventRecorded();
      }
    } catch (error) {
      console.error("Traffic simulation error:", error);
      setMessage("Failed to simulate traffic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={simulateTraffic}
        disabled={loading}
      >
        {loading ? "Simulating..." : "Simulate Traffic"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TrafficSimulator;