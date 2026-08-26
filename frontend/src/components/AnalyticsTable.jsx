import React from "react";
import styles from "./Dashboard.module.css"; 

const AnalyticsTable = ({ videos = [] }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.analyticsTable}>
        <thead>
          <tr>
            <th>Video Title</th>
            <th>Product</th>
            <th>Views</th>
            <th>Clicks</th>
            <th>Add to Carts</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>

        <tbody>
          {videos.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.emptyState}>
                No analytics data available.
              </td>
            </tr>
          ) : (
            videos.map((video) => {
              const views = Number(video.views) || 0;
              // Reverted back to your original 'conversions'
              const conversions = Number(video.conversions) || 0; 

              const conversionRate =
                views > 0 ? (conversions / views) * 100 : 0;

              return (
                <tr key={video.id}>
                  <td>{video.title}</td>
                  {/* Reverted back to your original 'productName' */}
                  <td>{video.productName}</td> 
                  <td>{views}</td>
                  <td>{Number(video.clicks) || 0}</td>
                  <td>{conversions}</td>
                  <td>{conversionRate.toFixed(2)}%</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;