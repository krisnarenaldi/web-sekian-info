"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { GiShoppingCart } from "react-icons/gi";

interface SembakoItem {
  komoditas: string;
  today: number;
  yesterday: number;
  change: number;
  unit: string;
}

interface SembakoData {
  data: SembakoItem[];
  date_info: {
    today: string;
    yesterday: string;
  };
  status: string;
  total_items: number;
}

const SembakoCard = ({ className }: { className?: string }) => {
  const [sembakoData, setSembakoData] = useState<SembakoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected commodities to display
  const selectedCommodities = [
    "Beras Medium",
    "Beras Premium",
    "Minyak Goreng Sawit Kemasan Premium",
    "Minyak Goreng Sawit Curah",
    "Minyakita",
    "Daging Ayam Ras",
    "Telur Ayam Ras",
    "Cabai Merah Besar",
  ];

  useEffect(() => {
    async function fetchSembakoData() {
      try {
        setLoading(true);
        setError(null);

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5500';
        const response = await fetch(`${apiBaseUrl}/api/sembako`);

        if (!response.ok) {
          throw new Error("Failed to fetch sembako data");
        }

        const data = await response.json();

        if (data.status === "success" && data.data) {
          setSembakoData(data);
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching sembako data:", err);
        setError("Gagal memuat data sembako");
        setLoading(false);
      }
    }

    fetchSembakoData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculatePercentageChange = (today: number, yesterday: number) => {
    if (yesterday === 0) return 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  const getChangeColor = (change: number) => {
    if (change < 0) return "#e74c3c"; // red
    if (change > 0) return "#27ae60"; // green
    return "var(--foreground)"; // use theme color
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "var(--text-muted)" }}>
          Memuat data sembako...
        </div>
      );
    }

    if (error || !sembakoData) {
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

    // Filter data to only show selected commodities
    const filteredData = sembakoData.data.filter((item) =>
      selectedCommodities.includes(item.komoditas),
    );

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
                  borderBottom: "2px solid var(--text-muted)",
                  backgroundColor: "rgba(128, 128, 128, 0.1)",
                }}
              >
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "var(--foreground)",
                  }}
                >
                  Komoditas
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "var(--foreground)",
                  }}
                >
                  Unit
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "right",
                    fontWeight: "600",
                    color: "var(--foreground)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sembakoData.date_info.yesterday}
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "right",
                    fontWeight: "600",
                    color: "var(--foreground)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sembakoData.date_info.today}
                </th>
                <th
                  style={{
                    padding: "10px 8px",
                    textAlign: "right",
                    fontWeight: "600",
                    color: "var(--foreground)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Perubahan (%)
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
              {filteredData.map((item, index) => {
                const percentageChange = calculatePercentageChange(
                  item.today,
                  item.yesterday,
                );
                const changeColor = getChangeColor(item.change);

                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
                      display: "table",
                      width: "100%",
                      tableLayout: "fixed",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 8px",
                        color: "var(--foreground)",
                      }}
                    >
                      {item.komoditas}
                    </td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.unit}
                    </td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "right",
                        color: "var(--text-muted)",
                      }}
                    >
                      {formatPrice(item.yesterday)}
                    </td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: "var(--foreground)",
                      }}
                    >
                      {formatPrice(item.today)}
                    </td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: changeColor,
                      }}
                    >
                      {item.change > 0 && "+"}
                      {percentageChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary note */}
        <div
          style={{
            marginTop: "12px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          * Harga dalam Rupiah
        </div>
      </div>
    );
  };

  return (
    <Card
      className={className}
      title="Harga Sembako"
      icon={<GiShoppingCart style={{ color: "#F39C12" }} />}
      footerNote="Sumber: PIHPS Nasional"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/pexels-cottonbro-3971483-eggs.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Content with higher z-index */}
      <div style={{ position: "relative", zIndex: 1 }}>{renderContent()}</div>
    </Card>
  );
};

export default SembakoCard;
