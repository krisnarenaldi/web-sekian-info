"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import { BiNews } from "react-icons/bi";
import { getNews, NewsItem } from "@/actions/getNews";

const SOURCES = [
  {
    name: "Antara",
    url: "https://www.antaranews.com/rss/top-news",
    home_url: "https://www.antaranews.com",
  },
  {
    name: "CNN",
    url: "https://www.cnnindonesia.com/ekonomi/rss",
    home_url: "https://www.cnnindonesia.com",
  },
  {
    name: "Detik",
    url: "https://news.detik.com/berita/rss",
    home_url: "https://www.detik.com",
  },
  {
    name: "Kompas",
    url: "https://rss.kompas.com/api/feed/social?apikey=bc58c81819dff4b8d5c53540a2fc7ffd83e6314a",
    home_url: "https://www.kompas.com",
  },
  {
    name: "Kumparan",
    url: "https://lapi.kumparan.com/v2.0/rss",
    home_url: "https://www.kumparan.com",
  },
  {
    name: "Liputan6",
    url: "https://feed.liputan6.com/rss/news",
    home_url: "https://www.liputan6.com",
  },
  {
    name: "Republika",
    url: "https://www.republika.co.id/rss",
    home_url: "https://www.republika.co.id",
  },
  {
    name: "Tempo",
    url: "https://rss.tempo.co/nasional",
    home_url: "https://www.tempo.co",
  },
  {
    name: "Tirto",
    url: "https://tirto.id/sitemap/r/google-discover",
    home_url: "https://www.tirto.id",
  },
  {
    name: "Viva",
    url: "https://www.viva.co.id/get/all",
    home_url: "https://www.viva.co.id",
  },
];

const NewsCard = ({ className }: { className?: string }) => {
  const [activeSource, setActiveSource] = useState(SOURCES[1]); // Default to Detik
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const items = await getNews(activeSource.url, activeSource.name);
      setNewsItems(items);
      setLoading(false);
    };

    fetchNews();
  }, [activeSource]);

  return (
    <Card
      className={className}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BiNews style={{ color: "#4A90E2" }} />
            <span>Berita Terkini</span>
          </div>
        </div>
      }
      footerButtonText={`Lihat ${activeSource.name}`}
      footerButtonLink={activeSource.home_url}
    >
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
        }
      `}</style>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {SOURCES.map((source) => (
          <button
            key={source.name}
            onClick={() => setActiveSource(source)}
            style={{
              padding: "4px 12px",
              borderRadius: "16px",
              border: "none",
              backgroundColor:
                activeSource.name === source.name ? "#4A90E2" : "#f0f0f0",
              color: activeSource.name === source.name ? "white" : "#333",
              cursor: "pointer",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {source.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 140px",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div
                  className="skeleton"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))
          : newsItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  flex: "0 0 140px", // Fixed width for horizontal items
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  textDecoration: "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized // RSS images might be external
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BiNews size={32} color="#999" />
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "8px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
                    color: "white",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
      </div>
    </Card>
  );
};

export default NewsCard;
