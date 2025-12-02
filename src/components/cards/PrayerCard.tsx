"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { FaMosque } from "react-icons/fa";
import { useUserLocation } from "@/hooks/useUserLocation";

interface PrayerTime {
  name: string;
  time: string;
}

interface PrayerSchedule {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const PrayerCard = () => {
  const location = useUserLocation();
  const [currentPrayer, setCurrentPrayer] = useState<PrayerTime | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [fullSchedule, setFullSchedule] = useState<PrayerSchedule | null>(null);
  const [cityName, setCityName] = useState<string>("Jakarta");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.loading) return;

    async function fetchPrayerTimes() {
      try {
        setLoading(true);
        setError(null);

        // Use Jakarta as default city if location.city is not available
        const cityToSearch = location.city || "Jakarta";

        // Step 1: Get city ID
        const cityResponse = await fetch(
          `https://api.myquran.com/v2/sholat/kota/cari/${encodeURIComponent(cityToSearch)}`,
        );
        const cityData = await cityResponse.json();

        if (!cityData.status || !cityData.data || cityData.data.length === 0) {
          // If city not found, fallback to Jakarta
          const jakartaResponse = await fetch(
            `https://api.myquran.com/v2/sholat/kota/cari/Jakarta`,
          );
          const jakartaData = await jakartaResponse.json();

          if (
            !jakartaData.status ||
            !jakartaData.data ||
            jakartaData.data.length === 0
          ) {
            throw new Error("Failed to fetch prayer times");
          }

          cityData.data = jakartaData.data;
        }

        // Use the first city result
        const cityId = cityData.data[0].id;
        const cityNameFromApi = cityData.data[0].lokasi;
        setCityName(cityNameFromApi);

        // Step 2: Get prayer schedule for today
        const today = new Date();
        const dateStr = today.toISOString().split("T")[0]; // yyyy-mm-dd

        const scheduleResponse = await fetch(
          `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${dateStr}`,
        );
        const scheduleData = await scheduleResponse.json();

        if (!scheduleData.status || !scheduleData.data) {
          throw new Error("Failed to fetch prayer schedule");
        }

        const schedule: PrayerSchedule = scheduleData.data.jadwal;

        // Store full schedule in state
        setFullSchedule(schedule);

        // Step 3: Determine current and next prayer
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const prayerTimes = [
          { name: "Imsak", time: schedule.imsak },
          { name: "Subuh", time: schedule.subuh },
          { name: "Terbit", time: schedule.terbit },
          { name: "Dhuha", time: schedule.dhuha },
          { name: "Dzuhur", time: schedule.dzuhur },
          { name: "Ashar", time: schedule.ashar },
          { name: "Maghrib", time: schedule.maghrib },
          { name: "Isya", time: schedule.isya },
        ];

        // Convert prayer times to minutes for comparison
        const prayerTimesWithMinutes = prayerTimes.map((prayer) => {
          const [hours, minutes] = prayer.time.split(":").map(Number);
          return {
            ...prayer,
            totalMinutes: hours * 60 + minutes,
          };
        });

        // Find upcoming (current) and next prayer
        let current: PrayerTime | null = null;
        let next: PrayerTime | null = null;

        // Find the next upcoming prayer time
        for (let i = 0; i < prayerTimesWithMinutes.length; i++) {
          const prayer = prayerTimesWithMinutes[i];

          // If this prayer time is still in the future
          if (currentTimeInMinutes < prayer.totalMinutes) {
            current = { name: prayer.name, time: prayer.time };
            // Next prayer is the one after current
            if (i + 1 < prayerTimesWithMinutes.length) {
              const nextPrayerTime = prayerTimesWithMinutes[i + 1];
              next = { name: nextPrayerTime.name, time: nextPrayerTime.time };
            } else {
              // If current is Isya, next prayer is Imsak (next day)
              next = {
                name: "Imsak (Besok)",
                time: prayerTimesWithMinutes[0].time,
              };
            }
            break; // Found the upcoming prayer, exit loop
          }
        }

        // If no upcoming prayer found (time is after Isya), next prayer is tomorrow's Imsak
        if (!current) {
          current = {
            name: "Imsak (Besok)",
            time: prayerTimesWithMinutes[0].time,
          };
          next = {
            name: "Subuh (Besok)",
            time: prayerTimesWithMinutes[1].time,
          };
        }

        setCurrentPrayer(current);
        setNextPrayer(next);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError("Gagal memuat jadwal sholat");
        setLoading(false);
      }
    }

    fetchPrayerTimes();
  }, [location.city, location.loading]);

  const renderContent = () => {
    if (loading || location.loading) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "#666" }}>
          Memuat jadwal sholat...
        </div>
      );
    }

    if (error || location.error) {
      return (
        <div
          style={{
            padding: "10px 0",
            textAlign: "center",
            color: "#e74c3c",
            fontSize: "0.9rem",
          }}
        >
          {error || location.error}
        </div>
      );
    }

    if (!currentPrayer || !nextPrayer) {
      return (
        <div style={{ padding: "10px 0", textAlign: "center", color: "#666" }}>
          Jadwal tidak tersedia
        </div>
      );
    }

    return (
      <div style={{ padding: "10px 0" }}>
        {/* Current Prayer - Large Display */}
        <div style={{ marginBottom: "5px", fontSize: "0.9rem", color: "#666" }}>
          {currentPrayer.name}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {currentPrayer.time} WIB
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "#888",
            borderTop: "1px solid #eee",
            paddingTop: "8px",
            marginBottom: "12px",
          }}
        >
          Selanjutnya:{" "}
          <span style={{ fontWeight: "600", color: "#4A90E2" }}>
            {nextPrayer.name}
          </span>{" "}
          - {nextPrayer.time} WIB
        </div>

        {/* Full Schedule */}
        {fullSchedule && (
          <>
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
                Jadwal Lengkap Hari Ini
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  fontSize: "0.85rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Subuh</span>
                  <span style={{ fontWeight: "500" }}>
                    {fullSchedule.subuh}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Dzuhur</span>
                  <span style={{ fontWeight: "500" }}>
                    {fullSchedule.dzuhur}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Ashar</span>
                  <span style={{ fontWeight: "500" }}>
                    {fullSchedule.ashar}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Maghrib</span>
                  <span style={{ fontWeight: "500" }}>
                    {fullSchedule.maghrib}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Isya</span>
                  <span style={{ fontWeight: "500" }}>{fullSchedule.isya}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Imsak</span>
                  <span style={{ fontWeight: "500" }}>
                    {fullSchedule.imsak}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Card
      title={`Jadwal Sholat - ${cityName}`}
      icon={<FaMosque style={{ color: "#4A90E2" }} />}
      footerNote="Sumber: MyQuran.com"
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
          backgroundImage: "url(/kabah2.jpg)",
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

export default PrayerCard;
