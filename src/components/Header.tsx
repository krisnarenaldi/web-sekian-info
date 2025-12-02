"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { getNewsTicker, NewsTickerItem } from "@/actions/getNewsTicker";
import { BsMoonStars, BsSun } from "react-icons/bs";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsTickerItem[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const items = await getNewsTicker("https://feeds.bbci.co.uk/news/world/rss.xml");
      setNewsItems(items);
    };

    fetchNews();
    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000); // Change news every 5 seconds

    return () => clearInterval(interval);
  }, [newsItems]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const dayName = days[now.getDay()];
      const day = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      setCurrentDate(`${dayName}, ${day} ${monthName} ${year}`);
    };

    updateDate();
    // Update date every minute
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoImageWrapper}>
          <Image
            src="/favicon_io/android-chrome-192x192.png"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </div>
        <div>
          <div>Sekian Info</div>
          {currentDate && (
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "normal",
                color: "#666",
                marginTop: "2px",
              }}
            >
              {currentDate}
            </div>
          )}
        </div>
      </div>

      <div className={styles.tickerContainer}>
        {newsItems.length > 0 ? (
          <div className={styles.tickerWrapper}>
            <div
              key={currentNewsIndex}
              className={styles.tickerItem}
              style={{
                animation: "fadeInUp 0.5s ease-out"
              }}
            >
              <a
                href={newsItems[currentNewsIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tickerLink}
              >
                <span className={styles.tickerLabel}>NEWS</span>
                <span className={styles.tickerText}>{newsItems[currentNewsIndex].title}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.tickerItem}>
            <span className={styles.tickerText}>Loading news...</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <BsSun /> : <BsMoonStars />}
        </button>
        {/*<button className={styles.iconBtn} aria-label="Menu">
          <FiMenu />
        </button>*/}
      </div>
    </header>
  );
};

export default Header;
