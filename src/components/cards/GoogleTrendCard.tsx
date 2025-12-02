"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { FaChartLine } from "react-icons/fa";

interface TrendingSearch {
  category: string;
  query: string;
  search_volume: number;
}

interface GoogleTrendData {
  status: string;
  trending_searches: TrendingSearch[];
}

const GoogleTrendCard = ({ className }: { className?: string }) => {
  const [trendData, setTrendData] = useState<GoogleTrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendData() {
      try {
        setLoading(true);
        setError(null);

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5500';
        const response = await fetch(`${apiBaseUrl}/api/google_trend`);

        if (!response.ok) {
          throw new Error("Failed to fetch Google Trend data");
        }

        const data = await response.json();

        if (data.status === "success" && data.trending_searches) {
          setTrendData(data);
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching Google Trend data:", err);
        setError("Gagal memuat data trending");
        setLoading(false);
      }
    }

    fetchTrendData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchTrendData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatSearchVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}K`;
    }
    return volume.toString();
  };

  const getVolumeColor = (volume: number): string => {
    if (volume >= 100000) return "#E53935"; // Red - Very hot
    if (volume >= 50000) return "#FB8C00"; // Orange - Hot
    if (volume >= 20000) return "#FDD835"; // Yellow - Warm
    return "#66BB6A"; // Green - Moderate
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: "10px 0" }}>
          <style jsx>{`
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            .skeleton {
              background: linear-gradient(
                90deg,
                #f0f0f0 25%,
                #e0e0e0 50%,
                #f0f0f0 75%
              );
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
              border-radius: 8px;
            }
          `}</style>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="skeleton"
              style={{
                height: "60px",
                marginBottom: "8px",
              }}
            />
          ))}
        </div>
      );
    }

    if (error || !trendData) {
      return (
        <div
          style={{
            padding: "10px 0",
            textAlign: "center",
            color: "#e74c3c",
            fontSize: "0.9rem",
          }}
        >
          {error || "Data tidak tersedia"}
        </div>
      );
    }

    return (
      <div style={{ padding: "10px 0" }}>
        <div
          style={{
            overflowX: "auto",
            fontSize: "0.85rem",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.85rem",
              display: "block",
            }}
          >
            <thead
              style={{
                display: "table",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <tr
                style={{
                  borderBottom: "2px solid #ddd",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#333",
                    width: "50px",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Trending Search
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#333",
                    width: "100px",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "right",
                    fontWeight: "600",
                    color: "#333",
                    whiteSpace: "nowrap",
                    width: "100px",
                  }}
                >
                  Searches
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                display: "block",
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {trendData.trending_searches.map((trend, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    display: "table",
                    width: "100%",
                    tableLayout: "fixed",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.open(
                      `https://www.google.com/search?q=${encodeURIComponent(trend.query)}`,
                      "_blank",
                    );
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 8px",
                      textAlign: "center",
                      width: "50px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: index < 3 ? "#4285F4" : "#9AA0A6",
                        color: "white",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: "#333",
                      fontWeight: "500",
                    }}
                  >
                    {trend.query}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      textAlign: "center",
                      width: "100px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#e8f0fe",
                        borderRadius: "4px",
                        color: "#1967d2",
                        fontSize: "0.75rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {trend.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      textAlign: "right",
                      fontWeight: "600",
                      color: getVolumeColor(trend.search_volume),
                      whiteSpace: "nowrap",
                      width: "100px",
                    }}
                  >
                    {formatSearchVolume(trend.search_volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary note */}
        <div
          style={{
            marginTop: "12px",
            fontSize: "0.75rem",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          * Click on any row to search on Google
        </div>
      </div>
    );
  };

  return (
    <Card
      className={className}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaChartLine style={{ color: "#4285F4" }} />
          <span>Google Trending Last 24 hours</span>
        </div>
      }
      // footerButtonText="Lihat Google Trends"
      // footerButtonLink="https://trends.google.com/trending"
    >
      {renderContent()}
    </Card>
  );
};

export default GoogleTrendCard;
