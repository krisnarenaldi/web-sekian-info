"use client";

import React from "react";
import Card from "../Card";
import { FaTrain, FaUser } from "react-icons/fa";
import Image from "next/image";

export const TransportCard = ({ className }: { className?: string }) => {
  return (
    <Card
      title="Jadwal MRT"
      icon={<FaTrain style={{ color: "#4A90E2" }} />}
      className={className}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          marginBottom: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src="https://boringapi.com/api/v1/static/photos/300.jpeg"
          alt="Transport"
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <FaTrain size={24} color="#666" />
        <div>
          <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            Lebak Bulus
          </div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>17:10 WIB</div>
        </div>
      </div>
    </Card>
  );
};

export const AboutMeCard = ({ className }: { className?: string }) => {
  const [greeting, setGreeting] = React.useState("Wilujeng");

  React.useEffect(() => {
    const greetings = [
      "Saleum Teuka", // aceh
      "Salamaik Datang", // minang
      "Sugeng Rawuh", // jawa
      "Wilujeng sumping", // Sunda
      "Rahajeung rauh", // bali
      "Salama Engka", // bugis
      "Salamakki Kabattuanta", // makassar
      "Tujai", // gorontalo
      "Salama Deteng", // palu
      "Maja", // dayak
      "Onomi Fokhai", // papua
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, []);

  return (
    <Card
      title={greeting}
      icon={<FaUser style={{ color: "#4A90E2" }} />}
      className={className}
    >
      <a
        href="https://saweria.co/papaloni"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "200px",
            marginBottom: "10px",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Image
            src="/saweria2.png"
            alt="Saweria"
            fill
            style={{ objectFit: "contain" }}
            unoptimized
          />
        </div>
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            Hello, nice to meet you
          </div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>
            If you like my work, please contact me on{" "}
            <a
              href="https://www.linkedin.com/in/krisna-renaldi-9b739b29/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4A90E2", textDecoration: "underline" }}
            >
              LinkedIn
            </a>{" "}
            or support via{" "}
            <a
              href="https://saweria.co/papaloni"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4A90E2", textDecoration: "underline" }}
            >
              Saweria
            </a>
            .
          </div>
        </div>
      </div>
    </Card>
  );
};
