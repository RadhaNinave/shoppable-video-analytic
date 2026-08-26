import React, { useCallback, useEffect, useState } from "react";

import AnalyticsTable from "./AnalyticsTable";
import TrafficSimulator from "./TrafficSimulator";

import styles from "./Dashboard.module.css";

const API_URL = "http://localhost:5000/api/analytics/videos";

const PAGE_SIZE = 5;

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const offset = page * PAGE_SIZE;

      const response = await fetch(
        `${API_URL}?limit=${PAGE_SIZE}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const result = await response.json();

      setVideos(result.data || []);
    } catch (error) {
      console.error("Analytics fetch error:", error);
      setError("Unable to load analytics data.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handlePrevious = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  const handleNext = () => {
    // Backend currently doesn't return total count.
    // We can prevent going forward when fewer than PAGE_SIZE
    // records are returned.
    if (videos.length === PAGE_SIZE) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const handleEventRecorded = () => {
    fetchAnalytics();
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Shoppable Video Analytics
            </h1>

            <p className={styles.subtitle}>
              Monitor video engagement and conversion performance.
            </p>
          </div>

          <TrafficSimulator
            videos={videos}
            onEventRecorded={handleEventRecorded}
          />
        </header>

        <section className={styles.card}>
          {loading ? (
            <div className={styles.status}>
              Loading analytics...
            </div>
          ) : error ? (
            <div className={styles.error}>
              {error}
            </div>
          ) : (
            <AnalyticsTable videos={videos} />
          )}

          <div className={styles.pagination}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={page === 0 || loading}
              className={styles.paginationButton}
            >
              Previous
            </button>

            <span className={styles.pageNumber}>
              Page {page + 1}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                loading || videos.length < PAGE_SIZE
              }
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;