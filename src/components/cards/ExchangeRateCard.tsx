"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { FaDollarSign } from "react-icons/fa";

interface ExchangeData {
  usd: number;
  sgd: number;
  aud: number;
  jpy: number;
  sar: number;
  hkd: number;
}

const ExchangeRateCard = () => {
  const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all required currency rates
        const responses = await Promise.all([
          fetch("https://open.er-api.com/v6/latest/USD"),
          fetch("https://open.er-api.com/v6/latest/SGD"),
          fetch("https://open.er-api.com/v6/latest/AUD"),
          fetch("https://open.er-api.com/v6/latest/JPY"),
          fetch("https://open.er-api.com/v6/latest/SAR"),
          fetch("https://open.er-api.com/v6/latest/HKD"),
        ]);

        const data = await Promise.all(responses.map((r) => r.json()));

        // Get rates: 1 USD/SGD/AUD/etc = X IDR
        setExchangeData({
          usd: data[0].rates.IDR || 0,
          sgd: data[1].rates.IDR || 0,
          aud: data[2].rates.IDR || 0,
          jpy: data[3].rates.IDR || 0,
          sar: data[4].rates.IDR || 0,
          hkd: data[5].rates.IDR || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
        setError("Gagal memuat kurs mata uang");
        setLoading(false);
      }
    }

    fetchExchangeRates();
  }, []);

  const formatIDR = (rate: number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(rate);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "#666" }}>
          Memuat kurs mata uang...
        </div>
      );
    }

    if (error || !exchangeData) {
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
        {/* Main Display - USD to IDR */}
        <div style={{ marginBottom: "5px", fontSize: "0.9rem", color: "#666" }}>
          1 USD =
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Rp {formatIDR(exchangeData.usd)}
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "#888",
            marginBottom: "12px",
          }}
        >
          Dollar Amerika Serikat
        </div>

        {/* Full Exchange Rates Table */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "12px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "#999",
              marginBottom: "8px",
            }}
          >
            Kurs Mata Uang Lainnya
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              fontSize: "0.85rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666" }}>SGD</span>
              <span style={{ fontWeight: "500" }}>
                Rp {formatIDR(exchangeData.sgd)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666" }}>AUD</span>
              <span style={{ fontWeight: "500" }}>
                Rp {formatIDR(exchangeData.aud)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666" }}>JPY</span>
              <span style={{ fontWeight: "500" }}>
                Rp {formatIDR(exchangeData.jpy)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666" }}>SAR</span>
              <span style={{ fontWeight: "500" }}>
                Rp {formatIDR(exchangeData.sar)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666" }}>HKD</span>
              <span style={{ fontWeight: "500" }}>
                Rp {formatIDR(exchangeData.hkd)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card
      title="Kurs Mata Uang"
      icon={<FaDollarSign style={{ color: "#27ae60" }} />}
      footerNote="Sumber: ExchangeRate-API.com"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, #27ae60, #a8e6a1)",
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Content with higher z-index */}
      <div style={{ position: "relative", zIndex: 1 }}>{renderContent()}</div>
    </Card>
  );
};

export default ExchangeRateCard;
