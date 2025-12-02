import React from "react";
import Card from "../Card";
import { MdMovie } from "react-icons/md";
import { FaTrain } from "react-icons/fa";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

export const CinemaCard = () => {
  return (
    <Card
      title="Film Tayang Bioskop"
      icon={<MdMovie style={{ color: "#4A90E2" }} />}
      footerButtonText="Lihat Detail"
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div
          style={{
            width: "60px",
            height: "80px",
            backgroundColor: "#ddd",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            color: "#666",
          }}
        >
          Poster
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            Judul Film
          </div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>XXI, CGV</div>
        </div>
      </div>
    </Card>
  );
};

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
  return (
    <Card
      title="Jadwal MRT"
      icon={<FaUser style={{ color: "#4A90E2" }} />}
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
