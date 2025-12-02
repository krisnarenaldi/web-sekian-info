"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../Card";
import { MdMovie } from "react-icons/md";

interface AnimeData {
    sources: string[];
    title: string;
    type: string;
    episodes: number;
    status: string;
    animeSeason: {
        season: string;
        year: number;
    };
    picture: string;
    thumbnail: string;
    duration: {
        value: number;
        unit: string;
    };
    score: {
        arithmeticGeometricMean: number;
        arithmeticMean: number;
        median: number;
    };
    synonyms: string[];
    studios: string[];
    producers: string[];
    relatedAnime: string[];
    tags: string[];
}

interface AnimeCardProps {
    className?: string;
    title?: string;
}

const AnimeCard = ({ className, title = "Rekomendasi Anime" }: AnimeCardProps) => {
    const [anime, setAnime] = useState<AnimeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://api.rei.my.id/anime/random");
                if (response.ok) {
                    const data = await response.json();
                    setAnime(data);
                }
            } catch (error) {
                console.error("Failed to fetch anime:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, []);

    if (loading) {
        return (
            <Card
                className={className}
                title={title}
                icon={<MdMovie style={{ color: "#9b59b6" }} />}
            >
                <div
                    style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                    }}
                >
                    Memuat anime...
                </div>
            </Card>
        );
    }

    if (!anime) {
        return (
            <Card
                className={className}
                title={title}
                icon={<MdMovie style={{ color: "#9b59b6" }} />}
            >
                <div
                    style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#e74c3c",
                    }}
                >
                    Gagal memuat anime
                </div>
            </Card>
        );
    }

    return (
        <Card
            className={className}
            title={title}
            icon={<MdMovie style={{ color: "#9b59b6" }} />}
            style={{
                position: "relative",
                overflow: "hidden",
            }}
        >
            <a
                href={anime.sources[0]}
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
                    background: "transparent",
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
                        zIndex: 0,
                    }}
                >
                    <Image
                        src={anime.picture}
                        alt={anime.title}
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
                            marginBottom: "5px",
                            lineHeight: "1.4",
                            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        {anime.title}
                    </h3>
                    {anime.producers && anime.producers.length > 0 && (
                        <p
                            style={{
                                fontSize: "0.85rem",
                                marginBottom: "0",
                                lineHeight: "1.5",
                                opacity: 0.9,
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                            }}
                        >
                            {anime.producers.join(", ")}
                        </p>
                    )}
                </div>
            </a>
        </Card>
    );
};

export default AnimeCard;
