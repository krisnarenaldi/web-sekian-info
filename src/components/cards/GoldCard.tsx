"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { GiGoldBar } from "react-icons/gi";

interface GoldPrice {
  sell: number;
  buy: number;
  updated_at: string;
}

interface GoldData {
  current: GoldPrice;
  history: GoldPrice[];
}

const GoldCard = () => {
  const [goldData, setGoldData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://pluang.com/api/asset/gold/pricing?daysLimit=7",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gold price");
        }

        const data = await response.json();

        if (data.status === "ok" && data.data) {
          setGoldData(data.data);
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching gold price:", err);
        setError("Gagal memuat harga emas");
        setLoading(false);
      }
    }

    fetchGoldPrice();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "#666" }}>
          Memuat harga emas...
        </div>
      );
    }

    if (error || !goldData) {
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

    const priceChange =
      goldData.history.length > 1
        ? goldData.current.sell - goldData.history[1].sell
        : 0;
    const priceChangePercent =
      goldData.history.length > 1
        ? ((priceChange / goldData.history[1].sell) * 100).toFixed(2)
        : "0.00";

    // Chart data
    const chartData = [...goldData.history].reverse();
    const prices = chartData.map((item) => item.sell);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Chart dimensions
    const chartHeight = 100;
    const chartWidth = 100;
    const padding = 10;

    // Calculate points for polyline
    const points = chartData
      .map((item, index) => {
        const x = (index / (chartData.length - 1)) * chartWidth;
        const y =
          chartHeight -
          ((item.sell - minPrice) / priceRange) * (chartHeight - padding * 2) -
          padding;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div style={{ padding: "10px 0" }}>
        {/* Current Price Section */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{ marginBottom: "5px", fontSize: "0.9rem", color: "#666" }}
          >
            Harga Jual (per gram)
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {formatPrice(goldData.current.sell)}
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: priceChange >= 0 ? "#27ae60" : "#e74c3c",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {priceChange >= 0 ? "↑" : "↓"} {formatPrice(Math.abs(priceChange))}{" "}
            ({priceChangePercent}%)
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid #eee",
            marginBottom: "15px",
          }}
        />

        {/* Chart Section */}
        <div
          style={{ fontSize: "0.85rem", color: "#666", marginBottom: "8px" }}
        >
          Grafik 7 Hari Terakhir
        </div>
        <svg
          width="100%"
          height="100"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1={chartHeight / 2}
            x2={chartWidth}
            y2={chartHeight / 2}
            stroke="#f0f0f0"
            strokeWidth="0.5"
          />

          {/* Chart line */}
          <polyline
            points={points}
            fill="none"
            stroke="#F5A623"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fill area under the line */}
          <polyline
            points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
            fill="url(#goldGradient)"
            opacity="0.3"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {chartData.map((item, index) => {
            const x = (index / (chartData.length - 1)) * chartWidth;
            const y =
              chartHeight -
              ((item.sell - minPrice) / priceRange) *
                (chartHeight - padding * 2) -
              padding;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill="#F5A623"
                stroke="white"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>

        {/* Chart Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: "#999",
            marginTop: "5px",
          }}
        >
          <span>
            {new Date(chartData[0].updated_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}
          </span>
          <span>
            {new Date(
              chartData[chartData.length - 1].updated_at,
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        {/* Price Range Info */}
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.8rem",
            color: "#666",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "0.7rem", color: "#999" }}>Terendah</div>
            <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
              {formatPrice(minPrice)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", color: "#999" }}>Tertinggi</div>
            <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
              {formatPrice(maxPrice)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card
      title="Harga Emas"
      icon={<GiGoldBar style={{ color: "#F5A623" }} />}
      footerNote="Sumber: Pluang.com"
    >
      {renderContent()}
    </Card>
  );
};

export default GoldCard;
