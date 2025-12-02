"use client";

import React, { useEffect, useState } from "react";
import Card from "../Card";
import { GiAirplaneArrival } from "react-icons/gi";

interface Flight {
    airlines: string;
    arrival_time: string;
    flight_numbers: string;
    origin: string;
    status: string;
    terminal: string;
}

interface FlightData {
    airport: string;
    flights: Flight[];
    scraped_at: string;
    status: string;
    time_period: number;
    total_flights: number;
    type: string;
}

const FlightArrivalsCard = ({ className }: { className?: string }) => {
    const [flightData, setFlightData] = useState<FlightData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState("Flight Arrival Cengkareng");

    useEffect(() => {
        const updateTitle = () => {
            const now = new Date();
            const currentHour = now.getHours();
            let timeRange = "";

            if (currentHour >= 0 && currentHour <= 6) {
                timeRange = "00:00 - 06:00";
            } else if (currentHour > 6 && currentHour <= 12) {
                timeRange = "06:00 - 12:00";
            } else if (currentHour > 12 && currentHour <= 18) {
                timeRange = "12:00 - 18:00";
            } else {
                timeRange = "18:00 - 24:00";
            }

            setTitle(`Flight Arrival Cengkareng ${timeRange}`);
        };

        updateTitle();
        // Update title every minute to ensure correctness if the user keeps the page open across boundaries
        const interval = setInterval(updateTitle, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchFlightData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("http://localhost:5500/api/flights/arrivals");

                if (!response.ok) {
                    throw new Error("Failed to fetch flight data");
                }

                const data = await response.json();

                if (data.status === "success" && data.flights) {
                    setFlightData(data);
                } else {
                    throw new Error("Invalid data format");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching flight data:", err);
                setError("Gagal memuat data penerbangan");
                setLoading(false);
            }
        }

        fetchFlightData();
    }, []);

    const getStatusColor = (status: string) => {
        if (status.includes("Landed")) return "#27ae60"; // green
        if (status.includes("Delayed")) return "#e74c3c"; // red
        if (status.includes("Estimated")) return "#f39c12"; // orange
        return "var(--foreground)"; // default - use theme color
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div style={{ padding: "10px 0", textAlign: "center", color: "var(--text-muted)" }}>
                    Memuat data penerbangan...
                </div>
            );
        }

        if (error || !flightData) {
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
                <div
                    style={{
                        overflowX: "auto",
                        fontSize: "0.85rem",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "0.85rem",
                            display: "block",
                        }}
                    >
                        <thead
                            style={{
                                display: "table",
                                width: "100%",
                                tableLayout: "fixed",
                            }}
                        >
                            <tr
                                style={{
                                    borderBottom: "2px solid var(--text-muted)",
                                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                                }}
                            >
                                <th
                                    style={{
                                        padding: "10px 8px",
                                        textAlign: "left",
                                        fontWeight: "600",
                                        color: "var(--foreground)",
                                        width: "20%",
                                    }}
                                >
                                    Time
                                </th>
                                <th
                                    style={{
                                        padding: "10px 8px",
                                        textAlign: "left",
                                        fontWeight: "600",
                                        color: "var(--foreground)",
                                        width: "25%",
                                    }}
                                >
                                    Flight
                                </th>
                                <th
                                    style={{
                                        padding: "10px 8px",
                                        textAlign: "left",
                                        fontWeight: "600",
                                        color: "var(--foreground)",
                                        width: "25%",
                                    }}
                                >
                                    Origin
                                </th>
                                <th
                                    style={{
                                        padding: "10px 8px",
                                        textAlign: "right",
                                        fontWeight: "600",
                                        color: "var(--foreground)",
                                        width: "30%",
                                    }}
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            style={{
                                display: "block",
                                maxHeight: "120px", // Approx 5 items height
                                overflowY: "auto",
                            }}
                        >
                            {flightData.flights.map((flight, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        borderBottom: "1px solid #eee",
                                        display: "table",
                                        width: "100%",
                                        tableLayout: "fixed",
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "10px 8px",
                                            color: "#333",
                                            width: "20%",
                                        }}
                                    >
                                        {flight.arrival_time}
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px 8px",
                                            color: "#333",
                                            width: "25%",
                                        }}
                                    >
                                        <div style={{ fontWeight: "600" }}>{flight.flight_numbers}</div>
                                        <div style={{ fontSize: "0.75rem", color: "#666" }}>
                                            {flight.airlines}
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px 8px",
                                            color: "#666",
                                            width: "25%",
                                        }}
                                    >
                                        {flight.origin}
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px 8px",
                                            textAlign: "right",
                                            fontWeight: "600",
                                            color: getStatusColor(flight.status),
                                            width: "30%",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        {flight.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div
                    style={{
                        marginTop: "12px",
                        fontSize: "0.75rem",
                        color: "#999",
                        fontStyle: "italic",
                        textAlign: "right"
                    }}
                >
                    Total: {flightData.total_flights} flights
                </div>
            </div>
        );
    };

    return (
        <Card
            className={className}
            title={title}
            icon={<GiAirplaneArrival style={{ color: "#3498db" }} />}
            footerNote={`Updated: ${flightData?.scraped_at || "-"}`}
            footerButtonText="Lihat Jadwal Lengkap"
            footerButtonLink="https://soekarnohatta.injourneyairports.id/flight/information"
        >
            {renderContent()}
        </Card>
    );
};

export default FlightArrivalsCard;
