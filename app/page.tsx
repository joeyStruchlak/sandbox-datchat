"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ChatWidget from "@/components/chat-widget";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const personas = [
    {
      title: "Category Manager",
      image: "/finance (1).jpg",
      description: "Manage product categories",
      route: "/category-manager",
    },
    {
      title: "Contract Manager",
      image: "finance (2).jpg",
      description: "Handle contracts and agreements",
      route: "/contract-manager",
    },
    {
      title: "Finance Manager",
      image: "finance (3).jpg",
      description: "Oversee financial operations and budgets",
      route: "/finance-manager",
    },
    {
      title: "Sourcing Manager",
      image: "finance (4).jpg",
      description: "Manage supplier relationships and procurement",
      route: "/sourcing-manager",
    },
  ];

  const handlePersonaClick = (route: string) => {
    router.push(route);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        backgroundImage: "url('/wall.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Chat Widget */}
      <ChatWidget />

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
        }}
      >
        <img
          src="/Untitled design (17).png"
          alt="Logo"
          style={{
            height: "100px", 
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 200px)",
          padding: "40px 20px",
        }}
      >
        {/* Main Title */}
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginTop: "120px",
            marginBottom: "40px",
            textAlign: "center",
            letterSpacing: "0.05em",
            background: "linear-gradient(to right, #65a17b, #387d55)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ANALYTIX HUB
        </h1>

        {/* Personas Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            maxWidth: "1200px",
            width: "100%",
            marginBottom: "60px",
          }}
        >
          {personas.map((persona, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                height: "450px",
              }}
              onClick={() => handlePersonaClick(persona.route)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4ade80";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  height: "300px",
                }}
              >
                <img
                  src={persona.image || "/placeholder.svg"}
                  alt={persona.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                {persona.title}
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                }}
              >
                {persona.description}
              </p>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div
          style={{
            backgroundColor: "white",
            border: "2px solid #e2e8f0",
            borderRadius: "12px",
            padding: "30px 20px",
            textAlign: "center",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Search
              style={{ width: "60px", height: "40px", color: "#4ade80" }}
            />
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "10px",
            }}
          >
            Search
          </h3>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search analytics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4ade80";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer (Optional) */}
      <div
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#64748b",
          fontSize: "15px",
          zIndex: 100,
        }}
      >
        
      </div>
    </div>
  );
}
