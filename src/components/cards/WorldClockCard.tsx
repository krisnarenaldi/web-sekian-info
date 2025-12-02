"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { BiTime } from "react-icons/bi";

const CITIES = [
    { name: "Beijing", timezone: "Asia/Shanghai" },
    { name: "Dubai", timezone: "Asia/Dubai" },
    { name: "New York", timezone: "America/New_York" },
    { name: "London", timezone: "Europe/London" },
    { name: "Makkah", timezone: "Asia/Riyadh" },
    { name: "Singapore", timezone: "Asia/Singapore" },
    { name: "Sydney", timezone: "Australia/Sydney" },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
];

const WorldClockCard = ({ className }: { className?: string }) => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getCityTime = (timezone: string) => {
        if (!time) return "--:--";
        return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: timezone,
            hour12: false,
        }).format(time);
    };

    const seconds = time ? time.getSeconds() : 0;
    const minutes = time ? time.getMinutes() : 0;
    const hours = time ? time.getHours() : 0;

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

    return (
        <Card
            className={className}
            title={
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BiTime style={{ color: "#4A90E2" }} />
                    <span>World Clock</span>
                </div>
            }
        >
            <div style={{ position: "relative", overflow: "hidden", minHeight: "200px" }}>
                {/* Analog Clock Background */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "200px",
                        height: "200px",
                        opacity: 0.1,
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            border: "4px solid #333",
                        }}
                    >
                        {/* Hour Hand */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "6px",
                                height: "50px",
                                backgroundColor: "#333",
                                transformOrigin: "bottom center",
                                transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
                                borderRadius: "3px",
                            }}
                        />
                        {/* Minute Hand */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "4px",
                                height: "70px",
                                backgroundColor: "#666",
                                transformOrigin: "bottom center",
                                transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
                                borderRadius: "2px",
                            }}
                        />
                        {/* Second Hand */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "2px",
                                height: "80px",
                                backgroundColor: "#e74c3c",
                                transformOrigin: "bottom center",
                                transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
                                borderRadius: "1px",
                            }}
                        />
                        {/* Center Dot */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#333",
                                borderRadius: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    </div>
                </div>

                {/* City Times List */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                        gap: "12px",
                    }}
                >
                    {CITIES.map((city) => (
                        <div
                            key={city.name}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <span style={{ fontSize: "0.8rem", color: "#666", marginBottom: "4px" }}>
                                {city.name}
                            </span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                                {getCityTime(city.timezone)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default WorldClockCard;
