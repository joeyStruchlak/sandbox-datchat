"use client"

import { Home, Search } from "lucide-react"
import Link from "next/link"
import ChatWidget from "@/components/chat-widget"

export default function LeakageAnalysis() {
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
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>S</span>
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
                <span style={{ color: "white", fontSize: "8px", fontWeight: "bold" }}>X</span>
              </div>
            </div>
            <div>
              <div style={{ color: "white", fontSize: "18px", fontWeight: "bold", lineHeight: "1.1" }}>SPEND</div>
              <div style={{ color: "white", fontSize: "14px", lineHeight: "1.1", letterSpacing: "0.5px" }}>
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
          Leakage Analysis
        </h1>

        {/* Icons - exact styling */}
        <div style={{ padding: "0 30px", display: "flex", gap: "15px" }}>
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
            <Search size={28} color="white" />
          </div>
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
          <Link href="/category-manager">
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
              Overview
            </button>
          </Link>
          <Link href="/category-manager">
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
              Goods
            </button>
          </Link>
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "24px",
              border: "none",
              backgroundColor: "white",
              color: "#2d5a5a",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
          >
            Leakage
          </button>
        </div>
      </div>

      <div style={{ padding: "0 50px 50px" }}>
        {/* Top Row - Key Metrics with exact styling */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              border: "3px solid #e2e8f0",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>28.57%</div>
            <div style={{ fontSize: "15px", color: "#64748b", fontWeight: "500" }}>Total Suppliers</div>
          </div>
          <div
            style={{
              border: "3px solid #e2e8f0",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>1.97%</div>
            <div style={{ fontSize: "15px", color: "#64748b", fontWeight: "500" }}>Total Transactions</div>
          </div>
          <div
            style={{
              border: "3px solid #e2e8f0",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>15.38%</div>
            <div style={{ fontSize: "15px", color: "#64748b", fontWeight: "500" }}>Total Invoices</div>
          </div>
          <div
            style={{
              border: "3px solid #e2e8f0",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444", marginBottom: "8px" }}>$9.91K</div>
            <div style={{ fontSize: "15px", color: "#64748b", fontWeight: "500" }}>Total Leakage</div>
          </div>
        </div>

        {/* Middle Row with enhanced styling */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginBottom: "25px",
          }}
        >
          {/* Leakage by Catalogue Status */}
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
              Leakage by Catalogue Status
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Enhanced Donut Chart */}
              <div style={{ position: "relative", width: "220px", height: "220px" }}>
                <svg width="220" height="220" viewBox="0 0 220 220">
                  {/* Outer ring - Non-Catalogue (coral/pink) */}
                  <circle
                    cx="110"
                    cy="110"
                    r="85"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="35"
                    strokeDasharray="67 350"
                    strokeDashoffset="0"
                    transform="rotate(-90 110 110)"
                  />
                  {/* Outer ring - Catalogue (green) */}
                  <circle
                    cx="110"
                    cy="110"
                    r="85"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="35"
                    strokeDasharray="350 67"
                    strokeDashoffset="-67"
                    transform="rotate(-90 110 110)"
                  />
                </svg>

                {/* Center values with exact styling */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "16px", color: "#64748b", fontWeight: "500" }}>$3.35K</div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>(25.26%)</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginTop: "10px" }}>
                    $9.91K (74.74%)
                  </div>
                </div>
              </div>

              {/* Enhanced Legend */}
              <div style={{ marginLeft: "50px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "16px", height: "16px", backgroundColor: "#22c55e", borderRadius: "50%" }}></div>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>Catalogue</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "16px", height: "16px", backgroundColor: "#f87171", borderRadius: "50%" }}></div>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>Non-Catalogue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Spend Leakage % by Department with enhanced styling */}
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
              Total Spend Leakage % by Department
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                height: "280px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    other
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#f87171",
                        height: "24px",
                        width: "35px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(248, 113, 113, 0.3)",
                      }}
                    ></div>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "130px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>23.43%</span>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>76.57%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    Finance
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "165px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>96.55%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>HR</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "175px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>IT</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "175px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    Operational department
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "175px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    Supply chain & procurement
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "175px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Legend */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "25px",
                  marginTop: "25px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "14px", height: "14px", backgroundColor: "#f87171", borderRadius: "3px" }}></div>
                  <span>Leakage Amount</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "14px", height: "14px", backgroundColor: "#22c55e", borderRadius: "3px" }}></div>
                  <span>Total Spend - Leakage</span>
                </div>
              </div>

              {/* Scale */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row with enhanced styling */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* Top 5 Item Leakage */}
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
              Top 5 Item Leakage
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                height: "280px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                  height: "200px",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      backgroundColor: "#a7f3d0",
                      width: "45px",
                      height: "140px",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(167, 243, 208, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "#1e293b",
                        fontWeight: "600",
                      }}
                    >
                      $3,190.00
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "9px", color: "#64748b", textAlign: "center", width: "70px", fontWeight: "500" }}
                  >
                    LENOVO X1 YOGA GEN 7 - 13GFLU WUXGA TOUCH, 1TB, 32GB, 4G LTE, W11P, 3YOS + 1YR...
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      backgroundColor: "#a7f3d0",
                      width: "45px",
                      height: "90px",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(167, 243, 208, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "#1e293b",
                        fontWeight: "600",
                      }}
                    >
                      $2,314.50
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "9px", color: "#64748b", textAlign: "center", width: "70px", fontWeight: "500" }}
                  >
                    - Storage Tanks
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      backgroundColor: "#a7f3d0",
                      width: "45px",
                      height: "90px",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(167, 243, 208, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "#1e293b",
                        fontWeight: "600",
                      }}
                    >
                      $2,314.50
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "9px", color: "#64748b", textAlign: "center", width: "70px", fontWeight: "500" }}
                  >
                    - Storage Tanks (25)
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      backgroundColor: "#a7f3d0",
                      width: "45px",
                      height: "50px",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(167, 243, 208, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "#1e293b",
                        fontWeight: "600",
                      }}
                    >
                      $1,224.30
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "9px", color: "#64748b", textAlign: "center", width: "70px", fontWeight: "500" }}
                  >
                    - Anchor Bolts
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      backgroundColor: "#a7f3d0",
                      width: "45px",
                      height: "35px",
                      borderRadius: "6px",
                      position: "relative",
                      boxShadow: "0 2px 4px rgba(167, 243, 208, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "#1e293b",
                        fontWeight: "600",
                      }}
                    >
                      $866.06
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "9px", color: "#64748b", textAlign: "center", width: "70px", fontWeight: "500" }}
                  >
                    Toilet, Bath, and Laundry Specialties
                  </div>
                </div>
              </div>

              {/* Y-axis labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                <span>$0K</span>
                <span>$1K</span>
                <span>$2K</span>
                <span>$3K</span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Product Description
              </div>
            </div>
          </div>

          {/* Top 5 Total Spend Leakage % by Supplier */}
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
              Top 5 Total Spend Leakage % by Supplier
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "3px solid #2d5a5a",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "30px",
                height: "280px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    CoIncorporated
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#f87171",
                        height: "24px",
                        width: "25px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(248, 113, 113, 0.3)",
                      }}
                    ></div>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "140px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>96.55%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    Bioplex
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "165px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>NEID</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "165px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    NewLabs
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "165px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", minWidth: "140px", color: "#1e293b" }}>
                    notapino
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <div
                      style={{
                        backgroundColor: "#22c55e",
                        height: "24px",
                        width: "165px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)",
                      }}
                    ></div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>100.00%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Legend */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "25px",
                  marginTop: "25px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "14px", height: "14px", backgroundColor: "#f87171", borderRadius: "3px" }}></div>
                  <span>Leakage Amount</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "14px", height: "14px", backgroundColor: "#22c55e", borderRadius: "3px" }}></div>
                  <span>Total Spend - Leakage</span>
                </div>
              </div>

              {/* Scale */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <ChatWidget />
    </div>
  )
}
