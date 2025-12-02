"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Card from "../Card";
import { MdMovie, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getCinema, CinemaItem } from "@/actions/getCinema";

const CinemaCard = ({ className }: { className?: string }) => {
    const [cinemaItems, setCinemaItems] = useState<CinemaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const fetchCinema = async () => {
            setLoading(true);
            const items = await getCinema();
            // Ensure we always have an array
            setCinemaItems(Array.isArray(items) ? items : []);
            setLoading(false);
        };

        fetchCinema();
    }, []);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            return () => container.removeEventListener('scroll', checkScrollButtons);
        }
    }, [cinemaItems]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 220; // Scroll by ~2 items (100px width + 10px gap)
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Card
            className={className}
            title="Film Tayang Bioskop"
            icon={<MdMovie style={{ color: "#4A90E2" }} />}
            // footerButtonText="Lihat Detail"
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
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

            <div style={{ position: "relative" }}>
                {/* Left Arrow */}
                {canScrollLeft && !loading && (
                    <button
                        onClick={() => scroll('left')}
                        style={{
                            position: "absolute",
                            left: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 10,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                        }}
                    >
                        <MdChevronLeft size={24} color="#333" />
                    </button>
                )}

                {/* Right Arrow */}
                {canScrollRight && !loading && (
                    <button
                        onClick={() => scroll('right')}
                        style={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 10,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                        }}
                    >
                        <MdChevronRight size={24} color="#333" />
                    </button>
                )}

                <div 
                    ref={scrollContainerRef}
                    style={{ 
                        display: "flex", 
                        gap: "10px", 
                        overflowX: "auto",
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge
                    }}
                    onScroll={checkScrollButtons}
                >
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                flex: "0 0 100px",
                                height: "180px",
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
                    : cinemaItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                position: "relative",
                                flex: "0 0 100px", // Fixed width for horizontal items
                                height: "180px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                textDecoration: "none",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            {item.poster ? (
                                <Image
                                    src={item.poster}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    unoptimized
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
                                    <MdMovie size={32} color="#999" />
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
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        margin: 0,
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default CinemaCard;
