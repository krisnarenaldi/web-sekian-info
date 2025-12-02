"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../Card";
import { MdNewspaper } from "react-icons/md";
import { getSingleNews, SingleNewsItem } from "@/actions/getSingleNews";

interface SingleNewsCardProps {
  className?: string;
  title?: string;
  rssUrl?: string;
}

const SingleNewsCard = ({ 
  className, 
  title = "Berita Pasar",
  rssUrl 
}: SingleNewsCardProps) => {
  const [news, setNews] = useState<SingleNewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const item = await getSingleNews(rssUrl);
      setNews(item);
      setLoading(false);
    };

    fetchNews();
  }, [rssUrl]);

  if (loading) {
    return (
      <Card
        className={className}
        title={title}
        icon={<MdNewspaper style={{ color: "#e74c3c" }} />}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          Memuat berita...
        </div>
      </Card>
    );
  }

  if (!news) {
    return (
      <Card
        className={className}
        title={title}
        icon={<MdNewspaper style={{ color: "#e74c3c" }} />}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#e74c3c",
          }}
        >
          Gagal memuat berita
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={className}
      title={title}
      icon={<MdNewspaper style={{ color: "#e74c3c" }} />}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          position: "relative",
          height: "300px",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
          background: news.image ? "transparent" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Background Image */}
        {news.image ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={news.image}
              alt={news.title}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
            {/* Dark overlay for text readability */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
              zIndex: 0,
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
            color: "white",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "10px",
              lineHeight: "1.4",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {news.title}
          </h3>
          <p
            style={{
              fontSize: "0.85rem",
              marginBottom: "10px",
              lineHeight: "1.5",
              opacity: 0.9,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {news.description}
          </p>
          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.8,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {new Date(news.pubDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </a>
    </Card>
  );
};

export default SingleNewsCard;
