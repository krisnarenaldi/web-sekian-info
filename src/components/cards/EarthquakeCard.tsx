"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { RiEarthquakeFill } from "react-icons/ri";

interface EarthquakeData {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
}

const EarthquakeCard = () => {
  const [earthquake, setEarthquake] = useState<EarthquakeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEarthquakeData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch earthquake data");
        }

        const data = await response.json();

        if (data.Infogempa && data.Infogempa.gempa && data.Infogempa.gempa[0]) {
          setEarthquake(data.Infogempa.gempa[0]);
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching earthquake data:", err);
        setError("Gagal memuat data gempa");
        setLoading(false);
      }
    }

    fetchEarthquakeData();
  }, []);

  const getMagnitudeColor = (magnitude: string) => {
    const mag = parseFloat(magnitude);
    if (mag >= 7) return "#D32F2F"; // Red - Very strong
    if (mag >= 6) return "#F57C00"; // Orange - Strong
    if (mag >= 5) return "#FFA726"; // Light orange - Moderate
    return "#FFB74D"; // Yellow - Light
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "#666" }}>
          Memuat data gempa...
        </div>
      );
    }

    if (error || !earthquake) {
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
        {/* Magnitude - Main Display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: `${getMagnitudeColor(earthquake.Magnitude)}20`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: getMagnitudeColor(earthquake.Magnitude),
            }}
          >
            <RiEarthquakeFill size={28} />
          </div>
          <div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
              M {earthquake.Magnitude}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#666" }}>
              {earthquake.Kedalaman}
            </div>
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          {earthquake.Wilayah}
        </div>

        {/* Date & Time */}
        <div
          style={{
            fontSize: "0.85rem",
            color: "#888",
            marginBottom: "12px",
          }}
        >
          📅 {earthquake.Tanggal} • {earthquake.Jam}
        </div>

        {/* Details Grid */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "12px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              fontSize: "0.85rem",
            }}
          >
            <div>
              <div style={{ color: "#999", fontSize: "0.75rem" }}>Lintang</div>
              <div style={{ fontWeight: "500" }}>{earthquake.Lintang}</div>
            </div>
            <div>
              <div style={{ color: "#999", fontSize: "0.75rem" }}>Bujur</div>
              <div style={{ fontWeight: "500" }}>{earthquake.Bujur}</div>
            </div>
          </div>
        </div>

        {/* Tsunami Warning */}
        <div
          style={{
            marginTop: "12px",
            padding: "8px",
            backgroundColor: earthquake.Potensi.toLowerCase().includes("tidak")
              ? "#E8F5E9"
              : "#FFEBEE",
            borderRadius: "6px",
            fontSize: "0.85rem",
            color: earthquake.Potensi.toLowerCase().includes("tidak")
              ? "#2E7D32"
              : "#C62828",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {earthquake.Potensi}
        </div>
      </div>
    );
  };

  return (
    <Card
      title="Info Gempa Terkini"
      icon={<RiEarthquakeFill style={{ color: "#F57C00" }} />}
      footerNote="Sumber: BMKG"
    >
      {renderContent()}
    </Card>
  );
};

export default EarthquakeCard;
