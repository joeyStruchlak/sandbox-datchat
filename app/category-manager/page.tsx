"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/chat-widget";

export default function CategoryManager() {
  const [activeTab, setActiveTab] = useState("goods");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#2d5a5a",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "85px",
          borderBottom: "4px solid #2d5a5a",
        }}
      >
        {/* Logo - exact match to image */}
        <div style={{ padding: "0 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                backgroundColor: "#4ade80",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                S
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  backgroundColor: "#22c55e",
                  width: "15px",
                  height: "15px",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "8px",
                    fontWeight: "bold",
                  }}
                >
                  X
                </span>
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                }}
              >
                SPEND
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "14px",
                  lineHeight: "1.1",
                  letterSpacing: "0.5px",
                }}
              >
                ANALYTIX
              </div>
            </div>
          </div>
        </div>

        {/* Title - exact positioning and styling */}
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "600",
            color: "white",
            margin: "0",
            textAlign: "center",
            flex: 1,
            letterSpacing: "0.5px",
          }}
        >
          Category Manager
        </h1>

        {/* Home Icon - exact styling */}
        <div style={{ padding: "0 30px" }}>
          <Link href="/">
            <div
              style={{
                backgroundColor: "#2d5a5a",
                borderRadius: "50%",
                padding: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid white",
                transition: "all 0.2s ease",
              }}
            >
              <Home size={28} color="white" />
            </div>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "25px 0",
          gap: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#2d5a5a",
            borderRadius: "30px",
            padding: "6px",
            boxShadow: "0 4px 12px rgba(45, 90, 90, 0.3)",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "14px 28px",
              borderRadius: "24px",
              border: "none",
              backgroundColor:
                activeTab === "overview" ? "white" : "transparent",
              color: activeTab === "overview" ? "#2d5a5a" : "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("goods")}
            style={{
              padding: "14px 28px",
              borderRadius: "24px",
              border: "none",
              backgroundColor: activeTab === "goods" ? "white" : "transparent",
              color: activeTab === "goods" ? "#2d5a5a" : "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
          >
            Goods
          </button>
          <Link href="/leakage-analysis">
            <button
              style={{
                padding: "14px 28px",
                borderRadius: "24px",
                border: "none",
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "16px",
              }}
            >
              Leakage
            </button>
          </Link>
        </div>
      </div>

      {activeTab === "goods" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 50px 25px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: "#2d5a5a",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: "220px",
                boxShadow: "0 2px 8px rgba(45, 90, 90, 0.2)",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Goods UNSPSC
              </span>
              <div
                style={{
                  backgroundColor: "white",
                  color: "#2d5a5a",
                  padding: "4px 8px",
                  borderRadius: "50%",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  fontWeight: "bold",
                }}
              >
                <span>ℹ</span>
              </div>
            </div>
            <select
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid #d1d5db",
                backgroundColor: "white",
                minWidth: "120px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              <option>All</option>
            </select>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "overview" && <OverviewContent />}
      {activeTab === "goods" && <GoodsContent />}

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
      ></div>

      <ChatWidget />
    </div>
  );
}

function OverviewContent() {
  return (
    <div style={{ padding: "0 50px 50px" }}>
      <div style={{ display: "flex", gap: "25px" }}>
        {/* Left Side - Main Content */}
        <div style={{ flex: 1 }}>
          {/* Spend Analysis - exact styling */}
          <div style={{ marginBottom: "25px" }}>
            <div
              style={{
                backgroundColor: "#2d5a5a",
                color: "white",
                padding: "16px 25px",
                borderRadius: "12px 12px 0 0",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.3px",
              }}
            >
              Spend Analysis
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "25px",
                }}
              >
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    52.19%
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Categorised
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    $190.27K
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Total Spend
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    1
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Total Suppliers
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    179
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Total Transactions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leakage Analysis - exact styling */}
          <div>
            <div
              style={{
                backgroundColor: "#2d5a5a",
                color: "white",
                padding: "16px 25px",
                borderRadius: "12px 12px 0 0",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.3px",
              }}
            >
              Leakage Analysis
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "25px",
                }}
              >
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    $1,224.30
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Leakage this Month
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    $3,538.80
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Leakage this Quarter
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    $6,560.67
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Leakage this Fiscal Year
                  </div>
                </div>
                <div
                  style={{
                    border: "3px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "25px",
                    textAlign: "center",
                    backgroundColor: "#fafbfc",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#1e293b",
                      marginBottom: "8px",
                    }}
                  >
                    $9,911.13
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Overall Leakage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ minWidth: "280px" }}>
          <div
            style={{
              backgroundColor: "#2d5a5a",
              color: "white",
              padding: "16px 25px",
              borderRadius: "12px 12px 0 0",
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              letterSpacing: "0.3px",
            }}
          >
            Search By
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "3px solid #2d5a5a",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              padding: "25px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Department Section */}
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  backgroundColor: "#2d5a5a",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Department
              </div>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      flex: 1,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "12px",
                    fontWeight: "500",
                  }}
                >
                  Select all
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked
                      style={{ transform: "scale(1.1)" }}
                    />
                    <span
                      style={{
                        backgroundColor: "#1e293b",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      Finance
                    </span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ transform: "scale(1.1)" }}
                    />
                    <span style={{ fontWeight: "500" }}>HR</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ transform: "scale(1.1)" }}
                    />
                    <span style={{ fontWeight: "500" }}>IT</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ transform: "scale(1.1)" }}
                    />
                    <span style={{ fontWeight: "500" }}>
                      Operational department
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Supplier Name Section */}
            <div>
              <div
                style={{
                  backgroundColor: "#2d5a5a",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Supplier Name
              </div>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      flex: 1,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "12px",
                    fontWeight: "500",
                  }}
                >
                  Select all
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked
                      style={{ transform: "scale(1.1)" }}
                    />
                    <span
                      style={{
                        backgroundColor: "#1e293b",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      CoIncorporated
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoodsContent() {
  return (
    <div style={{ padding: "0 50px 50px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginBottom: "25px",
        }}
      >
        {/* Total Spend By Department - exact styling */}
        <div>
          <div
            style={{
              backgroundColor: "#2d5a5a",
              color: "white",
              padding: "16px 25px",
              borderRadius: "12px 12px 0 0",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            Total Spend By Department
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "3px solid #2d5a5a",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              padding: "30px",
              height: "350px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                height: "100%",
              }}
            >
              {/* HR */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  HR
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "100%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $2,856,480.00
                    </div>
                  </div>
                </div>
              </div>

              {/* Finance */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  Finance
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "60%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $190,272.13
                    </div>
                  </div>
                </div>
              </div>

              {/* Supply chain & procurement */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  Supply chain & procurement
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "45%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $128,260.00
                    </div>
                  </div>
                </div>
              </div>

              {/* IT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  IT
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "15%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $37,665.61
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational department */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  Operational department
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "10%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $27,445.00
                    </div>
                  </div>
                </div>
              </div>

              {/* other */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    minWidth: "220px",
                    textAlign: "right",
                    paddingRight: "15px",
                    color: "#1e293b",
                  }}
                >
                  other
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      height: "24px",
                      width: "8%",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "13px",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      $16,299.23
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* X-axis labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
                fontSize: "13px",
                color: "#64748b",
                paddingLeft: "220px",
                fontWeight: "500",
              }}
            >
              <span>$0M</span>
              <span>$1M</span>
              <span>$2M</span>
              <span>$3M</span>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Total Spend
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "#2d5a5a",
              color: "white",
              padding: "16px 25px",
              borderRadius: "12px 12px 0 0",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            Spend Trend
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "3px solid #2d5a5a",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              padding: "30px",
              height: "350px",
              position: "relative",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Values in top right */}
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
                fontSize: "14px",
                color: "#64748b",
                textAlign: "right",
                fontWeight: "600",
              }}
            >
              <div style={{ fontWeight: "700", color: "#1e293b" }}>$1.45M</div>
              <div style={{ marginTop: "6px" }}>100</div>
            </div>

            {/* Y-axis labels */}
            <div
              style={{
                position: "absolute",
                left: "25px",
                top: "50px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "#64748b",
                fontWeight: "500",
              }}
            >
              <span>$1.5M</span>
              <span>$1.0M</span>
              <span>$0.5M</span>
              <span>$0.0M</span>
            </div>

            {/* Chart area with exact styling */}
            <div
              style={{
                marginLeft: "70px",
                marginTop: "50px",
                height: "200px",
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Sample bars with trend line - exact colors and positioning */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "80px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Aug
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 20
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "25px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Jan
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 21
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "40px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Feb
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 21
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "65px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Mar
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 21
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "50px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  May
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 24
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "30px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Apr
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 24
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "140px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Sep
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 25
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "160px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Nov
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 25
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "30px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Jan
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 26
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "150px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Oct
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 26
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    width: "24px",
                    height: "160px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Dec
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>
                  FY 26
                </span>
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "25px",
                marginTop: "15px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#1e293b",
                    borderRadius: "50%",
                  }}
                ></div>
                <span>Total Spend</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "3px",
                    backgroundColor: "#64748b",
                  }}
                ></div>
                <span>Total Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Supplier Spend Overview */}
        <div>
          <div
            style={{
              backgroundColor: "#2d5a5a",
              color: "white",
              padding: "16px 25px",
              borderRadius: "12px 12px 0 0",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            Supplier Spend Overview
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "3px solid #2d5a5a",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              padding: "30px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Top 2 Suppliers
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  <span>$2.98M</span>
                  <span>98.71%</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Rest of the Suppliers
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  <span>$38.96K</span>
                  <span>1.29%</span>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  backgroundColor: "#2d5a5a",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "8px 8px 0 0",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Top 5 Spend by Supplier
              </div>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "2px solid #e2e8f0",
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      NEID
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      $2.9M
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      CoIncorporated
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      $0.2M
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      notapino
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      $0.1M
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      Bioplex
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      $0.0M
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      NewLabs
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>
                      $0.0M
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Total Spend
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spend by Category */}
        <div>
          <div
            style={{
              backgroundColor: "#2d5a5a",
              color: "white",
              padding: "16px 25px",
              borderRadius: "12px 12px 0 0",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            Spend by Category
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "3px solid #2d5a5a",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              padding: "30px",
              height: "450px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* UNSPSC Categories */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  🔒 UNSPSC-Segment
                </div>
                <div style={{ fontWeight: "500", marginBottom: "2px" }}>
                  Vehicles and their Access...
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  🔒 UNSPSC-Family
                </div>
                <div style={{ fontWeight: "500", marginBottom: "2px" }}>
                  Motor vehicles
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  🔒 UNSPSC-Class
                </div>
                <div style={{ fontWeight: "500", marginBottom: "2px" }}>
                  Passenger motor vehicles
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  🔒 UNSPSC-Comm...
                </div>
              </div>
            </div>

            {/* Spending amounts with tree structure */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  padding: "12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  position: "relative",
                }}
              >
                <div>Vehicles and their Access...</div>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  $1,995,620.00
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "10px",
                  }}
                >
                  Total Line Amount Inc GST
                  <br />
                  $3,264,621.97
                </div>
              </div>

              <div style={{ marginLeft: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  <div>Motor vehicles</div>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    $1,995,620.00
                  </div>
                  <div style={{ fontSize: "10px" }}>$1,080,207.47</div>
                </div>

                <div style={{ marginLeft: "20px" }}>
                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      color: "white",
                      padding: "8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                      marginBottom: "6px",
                    }}
                  >
                    <div>Passenger motor vehicles</div>
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                      $1,521,850.00
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#22c55e",
                      color: "white",
                      padding: "8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "500",
                      marginBottom: "6px",
                    }}
                  >
                    <div>Light trucks or sport util</div>
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                      $1,001,770.00
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#64748b" }}>No Segment Title Found</div>
                <div style={{ fontWeight: "500" }}>$172,108.22</div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  <div>Safety and rescue vehicles</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                    $881,810.00
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  <div>Automobiles or cars</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                    $140,580.00
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  <div>Specialized and recreatio...</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                    $91,960.00
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  <div>Buses</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                    $121,000.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
