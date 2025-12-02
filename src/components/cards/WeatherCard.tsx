"use client";

import React, { useEffect, useState, ReactElement } from "react";
import Card from "../Card";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCloud, FaCloudRain, FaSnowflake, FaBolt } from "react-icons/fa";
import { WiDaySunny, WiNightClear, WiCloudyGusts } from "react-icons/wi";
import { useUserLocation } from "@/hooks/useUserLocation";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  isDay: number;
  condition: string;
}

const WeatherCard = () => {
  const location = useUserLocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location.city || location.loading) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;

        if (!API_KEY) {
          throw new Error("API key not configured");
        }

        // Fetch weather using city name
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location.city)}&aqi=no&lang=id`;
        console.log("Fetching weather from WeatherAPI.com");

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Weather API Error:", response.status, errorData);
          throw new Error(
            `Failed to fetch weather: ${errorData.error?.message || response.statusText}`,
          );
        }

        const data = await response.json();
        console.log("Weather data received:", data);

        setWeather({
          temperature: Math.round(data.current.temp_c),
          description: data.current.condition.text,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          isDay: data.current.is_day,
          condition: data.current.condition.text.toLowerCase(),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Gagal memuat data cuaca";
        setError(errorMessage);
        setLoading(false);
      }
    }

    fetchWeather();
  }, [location.city, location.loading]);

  const translateCondition = (condition: string): string => {
    const conditionLower = condition.toLowerCase();

    // Mapping English weather conditions to Indonesian
    const translations: { [key: string]: string } = {
      sunny: "Cerah",
      clear: "Cerah",
      "partly cloudy": "Cerah Berawan",
      cloudy: "Berawan",
      overcast: "Mendung",
      mist: "Kabut",
      fog: "Kabut Tebal",
      "patchy rain possible": "Kemungkinan Hujan",
      "patchy snow possible": "Kemungkinan Salju",
      "patchy sleet possible": "Kemungkinan Hujan Es",
      "patchy freezing drizzle possible": "Kemungkinan Gerimis Beku",
      "thundery outbreaks possible": "Kemungkinan Petir",
      "blowing snow": "Badai Salju",
      blizzard: "Badai Salju Besar",
      "freezing fog": "Kabut Beku",
      "patchy light drizzle": "Gerimis Ringan",
      "light drizzle": "Gerimis Ringan",
      "freezing drizzle": "Gerimis Beku",
      "heavy freezing drizzle": "Gerimis Beku Lebat",
      "patchy light rain": "Hujan Ringan",
      "light rain": "Hujan Ringan",
      "moderate rain at times": "Hujan Sedang",
      "moderate rain": "Hujan Sedang",
      "heavy rain at times": "Hujan Lebat",
      "heavy rain": "Hujan Lebat",
      "light freezing rain": "Hujan Beku Ringan",
      "moderate or heavy freezing rain": "Hujan Beku Lebat",
      "light sleet": "Hujan Es Ringan",
      "moderate or heavy sleet": "Hujan Es Lebat",
      "patchy light snow": "Salju Ringan",
      "light snow": "Salju Ringan",
      "patchy moderate snow": "Salju Sedang",
      "moderate snow": "Salju Sedang",
      "patchy heavy snow": "Salju Lebat",
      "heavy snow": "Salju Lebat",
      "ice pellets": "Butiran Es",
      "light rain shower": "Hujan Gerimis",
      "moderate or heavy rain shower": "Hujan Deras",
      "torrential rain shower": "Hujan Sangat Deras",
      "light sleet showers": "Hujan Es Ringan",
      "moderate or heavy sleet showers": "Hujan Es Lebat",
      "light snow showers": "Salju Ringan",
      "moderate or heavy snow showers": "Salju Lebat",
      "light showers of ice pellets": "Butiran Es Ringan",
      "moderate or heavy showers of ice pellets": "Butiran Es Lebat",
      "patchy light rain with thunder": "Hujan Ringan Disertai Petir",
      "moderate or heavy rain with thunder": "Hujan Petir",
      "patchy light snow with thunder": "Salju Ringan Disertai Petir",
      "moderate or heavy snow with thunder": "Salju Lebat Disertai Petir",
    };

    // Check for exact match first
    for (const [english, indonesian] of Object.entries(translations)) {
      if (conditionLower === english) {
        return indonesian;
      }
    }

    // Check for partial match
    for (const [english, indonesian] of Object.entries(translations)) {
      if (conditionLower.includes(english)) {
        return indonesian;
      }
    }

    // Return original if no translation found
    return condition;
  };

  const getWeatherIcon = (condition: string, isDay: number): ReactElement => {
    const conditionLower = condition.toLowerCase();

    // Clear/Sunny
    if (
      conditionLower.includes("cerah") ||
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear")
    ) {
      return isDay === 1 ? (
        <WiDaySunny style={{ fontSize: "4rem", color: "#FFD700" }} />
      ) : (
        <WiNightClear style={{ fontSize: "4rem", color: "#FFF8DC" }} />
      );
    }

    // Partly cloudy
    if (
      conditionLower.includes("sebagian") ||
      conditionLower.includes("partly")
    ) {
      return isDay === 1 ? (
        <TiWeatherPartlySunny style={{ fontSize: "4rem", color: "#FFD700" }} />
      ) : (
        <WiCloudyGusts style={{ fontSize: "4rem", color: "#E8E8E8" }} />
      );
    }

    // Cloudy/Overcast
    if (
      conditionLower.includes("berawan") ||
      conditionLower.includes("cloudy") ||
      conditionLower.includes("overcast")
    ) {
      return <FaCloud style={{ fontSize: "4rem", color: "#D3D3D3" }} />;
    }

    // Rain
    if (
      conditionLower.includes("hujan") ||
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return <FaCloudRain style={{ fontSize: "4rem", color: "#87CEEB" }} />;
    }

    // Thunderstorm
    if (
      conditionLower.includes("petir") ||
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm")
    ) {
      return <FaBolt style={{ fontSize: "4rem", color: "#FFD700" }} />;
    }

    // Snow
    if (conditionLower.includes("salju") || conditionLower.includes("snow")) {
      return <FaSnowflake style={{ fontSize: "4rem", color: "#FFFFFF" }} />;
    }

    // Default
    return (
      <TiWeatherPartlySunny style={{ fontSize: "4rem", color: "#FFD700" }} />
    );
  };

  const renderContent = () => {
    if (loading || location.loading) {
      return (
        <div style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <FaCloud /> <span>Cuaca Hari Ini</span>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Memuat data cuaca...
          </div>
        </div>
      );
    }

    if (error || location.error) {
      return (
        <div style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <FaCloud /> <span>Cuaca Hari Ini</span>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.9rem",
            }}
          >
            {error || location.error}
          </div>
        </div>
      );
    }

    if (!weather) {
      return (
        <div style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <FaCloud /> <span>Cuaca Hari Ini</span>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Data cuaca tidak tersedia
          </div>
        </div>
      );
    }

    return (
      <div style={{ color: "white" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <FaCloud /> <span>Cuaca Hari Ini</span>
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {getWeatherIcon(weather.condition, weather.isDay)}
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
            {weather.temperature}°C
          </div>
          <div style={{ fontSize: "1rem", opacity: 0.9 }}>
            {location.city}
            {location.country && `, ${location.country}`}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              marginTop: "8px",
            }}
          >
            {translateCondition(weather.description)}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "10px",
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            <span>💧 {weather.humidity}%</span>
            <span>💨 {weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card
      style={{
        background: "linear-gradient(180deg, #6FA1D9 0%, #4A90E2 100%)",
        color: "white",
      }}
      footerNote="Sumber: WeatherAPI.com"
    >
      {renderContent()}
    </Card>
  );
};

export default WeatherCard;
