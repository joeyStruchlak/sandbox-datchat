// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import ChatWidget from "@/components/chat-widget";
// import { useRouter } from "next/navigation";
// import ExpandableChatWidget from "@/components/expandable-chat-widget";

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const personas = [
//     {
//       title: "Category Manager",
//       image: "/finance (1).jpg",
//       description: "Manage product categories",
//       route: "/category-manager",
//     },
//     {
//       title: "Contract Manager",
//       image: "finance (2).jpg",
//       description: "Handle contracts and agreements",
//       route: "/contract-manager",
//     },
//     {
//       title: "Finance Manager",
//       image: "finance (3).jpg",
//       description: "Oversee financial operations and budgets",
//       route: "/finance-manager",
//     },
//     {
//       title: "Sourcing Manager",
//       image: "finance (4).jpg",
//       description: "Manage supplier relationships and procurement",
//       route: "/sourcing-manager",
//     },
//   ];

//   const handlePersonaClick = (route: string) => {
//     router.push(route);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "10vh",
//         backgroundColor: "#f8fafc",
//         backgroundImage: "url('/wall.jpg')",
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//       }}
//     >
//       {/* Chat Widget */}
//       <ChatWidget />

//       <div
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           zIndex: 10,
//         }}
//       >
//         <img
//           src="/Untitled design (17).png"
//           alt="Logo"
//           style={{
//             height: "100px",
//             width: "auto",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "calc(100vh - 200px)",
//           padding: "40px 20px",
//         }}
//       >
//         {/* Main Title */}
//         <h1
//           style={{
//             fontSize: "4rem",
//             fontWeight: "bold",
//             marginTop: "120px",
//             marginBottom: "40px",
//             textAlign: "center",
//             letterSpacing: "0.05em",
//             background: "linear-gradient(to right, #65a17b, #387d55)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           ANALYTIX HUB
//         </h1>

//         {/* Personas Grid */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "30px",
//             maxWidth: "1200px",
//             width: "100%",
//             marginBottom: "60px",
//           }}
//         >
//           {personas.map((persona, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #e2e8f0",
//                 borderRadius: "12px",
//                 padding: "20px",
//                 textAlign: "center",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "450px",
//               }}
//               onClick={() => handlePersonaClick(persona.route)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = "#4ade80";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow =
//                   "0 4px 12px rgba(0, 0, 0, 0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = "#e2e8f0";
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow =
//                   "0 1px 3px rgba(0, 0, 0, 0.1)";
//               }}
//             >
//               <div
//                 style={{
//                   flexGrow: 1,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginBottom: "20px",
//                   height: "300px",
//                 }}
//               >
//                 <img
//                   src={persona.image || "/placeholder.svg"}
//                   alt={persona.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>
//               <h3
//                 style={{
//                   fontSize: "1.25rem",
//                   fontWeight: "600",
//                   color: "#1e293b",
//                   marginBottom: "8px",
//                 }}
//               >
//                 {persona.title}
//               </h3>
//               <p
//                 style={{
//                   color: "#64748b",
//                   fontSize: "0.9rem",
//                   lineHeight: "1.4",
//                 }}
//               >
//                 {persona.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Search Section */}
//         <div
//           style={{
//             backgroundColor: "white",
//             border: "2px solid #e2e8f0",
//             borderRadius: "12px",
//             padding: "30px 20px",
//             textAlign: "center",
//             width: "100%",
//             maxWidth: "400px",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Search
//               style={{ width: "60px", height: "40px", color: "#4ade80" }}
//             />
//           </div>
//           <h3
//             style={{
//               fontSize: "1.25rem",
//               fontWeight: "600",
//               color: "#1e293b",
//               marginBottom: "10px",
//             }}
//           >
//             Search
//           </h3>
//           <div style={{ position: "relative" }}>
//             <input
//               type="text"
//               placeholder="Search analytics..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "8px",
//                 fontSize: "1rem",
//                 outline: "none",
//                 transition: "border-color 0.2s ease",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = "#4ade80";
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = "#d1d5db";
//               }}
//             />
//           </div>
//         </div>
//         <ExpandableChatWidget />
//       </div>

//       {/* Footer (Optional) */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "25px",
//           right: "25px",
//           display: "flex",
//           alignItems: "center",
//           gap: "10px",
//           color: "#64748b",
//           fontSize: "15px",
//           zIndex: 100,
//         }}
//       ></div>
//     </div>
//   );
// }

"use client";

import React from "react";
import dynamic from "next/dynamic";
import SummaryCard from "@/components/summary-card";
import remarkGfm from "remark-gfm";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  MessageCircle,
  Send,
  Home as HomeIcon,
  TrendingUp,
  FileText,
  BarChart3,
  Plus,
  Share2,
  Settings,
  ChevronDown,
  HelpCircle,
  X,
  Copy,
  Lightbulb,
  Check,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  chartData?: any[];
}

const ChartView = dynamic(() => import("@/components/chartView"), {
  ssr: false, // prevents server-side rendering
});
const showErrorToast = (message: string) => {
  if (typeof window === "undefined") return; // ✅ ensure this only runs in browser

  const toast = document.createElement("div");
  toast.className = "toast error";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: input,
      });
      const reply = res.data.reply;
      const chartData = res.data.chartData;

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: reply,
          chartData: chartData || null,
        },
      ]);
    } catch (error) {
      showErrorToast("Failed to send message");
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "toast error";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetToHome = () => {
    setMessages([]);
    setInput("");
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    setShowSuggestionsModal(false);
    inputRef.current?.focus();
  };

  const handleCopyQuestion = async (question: string) => {
    try {
      await navigator.clipboard.writeText(question);
      setCopiedQuestion(question);
      setTimeout(() => setCopiedQuestion(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const questionSuggestions = [
    {
      role: "Executive",
      icon: "",
      questions: [
        "What is the total spend across all categories this year compared to last year?",
        "Which suppliers account for the highest spend in Q3, and how has that changed from Q2?",
        "Are there any spend anomalies or trends I should be aware of?",
      ],
    },
    {
      role: "Finance",
      icon: "",
      questions: [
        "Find invoices with mismatched totals (invoice vs line items), include supplier and discrepancy",
        "Which invoices are overdue or paid outside agreed terms?",
        "What's the breakdown of spend by payment method this quarter?",
      ],
    },
    {
      role: "Procurement",
      icon: "",
      questions: [
        "Which products are driving the highest total spend across all suppliers?",
        "Are we meeting contract compliance thresholds for key suppliers?",
        "What are the top 3 spend categories with the most savings opportunities?",
      ],
    },
    {
      role: "Analyst",
      icon: "",
      questions: [
        "Can you show me spend trends by category across the last 3 years?",
        "What is the spend distribution across suppliers for a specific category?",
        "How does spend by business unit correlate to supplier performance metrics?",
      ],
    },
    {
      role: "General Exploration",
      icon: "",
      questions: [
        "Can you highlight areas of potential savings or overspending?",
        "How does spend compare across different regions or business units?",
        "What suppliers have inconsistent pricing for similar goods/services?",
      ],
    },
  ];

  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8f6f3 0%, #fdfcfa 25%, #f5f8f6 50%, #faf9f7 75%, #fefefe 100%)",
      }}
    >
      <header
        className="sticky top-0 z-30 border-b shadow-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "#e8e5e0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo / New Chat + Home Buttons */}
          <div className="flex items-center gap-3 min-w-[200px]">
            {messages.length > 0 ? (
              <>
                <button
                  onClick={resetToHome}
                  className="flex items-center gap-2 text-sm font-medium text-[#2d4f3e] bg-[#f1f5f3] hover:bg-[#e8edea] transition-all px-4 py-2 rounded-lg shadow-sm border border-transparent hover:border-[#d1d9d4]"
                >
                  <HomeIcon className="w-4 h-4" />
                  Home
                </button>
                <button
                  // onClick={}
                  className="flex items-center gap-2 text-sm font-medium text-[#2d4f3e] bg-[#f1f5f3] hover:bg-[#e8edea] transition-all px-4 py-2 rounded-lg shadow-sm border border-transparent hover:border-[#d1d9d4]"
                >
                  <Plus className="w-4 h-4" />
                  New Chat
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2.5 ml-40">
                <img
                  src="/anaBot.png"
                  alt="Logo"
                  className="w-12 h-10"
                  style={{ mixBlendMode: "multiply" }}
                />
                <span className="text-lg font-bold tracking-wide text-[#2d4f3e]">
                  Welcome Back, Aaron
                </span>
              </div>
            )}
          </div>

          {/* Center: Dynamic Chat Title */}
          <div className="flex-1 text-center overflow-hidden whitespace-nowrap">
            {messages.length > 0 && (
              <span
                className="text-sm font-medium text-[#4a5d50] animate-fadeIn"
                style={{ animationDuration: "500ms" }}
              >
                {/* Example of a dynamic title */}
                {messages[0].content.substring(0, 40)}
                {messages[0].content.length > 40 ? "..." : ""}
              </span>
            )}
          </div>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center gap-4 justify-end min-w-[200px]">
            {/* Action Icons */}
            <div className="flex items-center gap-4 justify-end min-w-[200px]">
              {/* Action Icons */}
              <div className="flex items-center gap-2">
                {/* Share */}
                <div className="relative group">
                  <button className="p-2.5 rounded-full text-[#4a5d50] hover:bg-[#f1f5f3] transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-[#4a5d50] rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Share
                  </div>
                </div>

                {/* Settings */}
                <div className="relative group">
                  <button className="p-2.5 rounded-full text-[#4a5d50] hover:bg-[#f1f5f3] transition-colors">
                    <Settings className="w-6 h-6" />
                  </button>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-[#4a5d50] rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Settings
                  </div>
                </div>

                {/* Help */}
                <div className="relative group">
                  <button className="p-2.5 rounded-full text-[#4a5d50] hover:bg-[#f1f5f3] transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </button>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-[#4a5d50] rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Help
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-[#e0e7e3]"></div>

            {/* User Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f3] transition-colors">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #5a8068, #4a6f58)",
                    color: "#fff",
                  }}
                >
                  A
                </div>
                <span className="text-sm font-semibold text-[#2d4f3e] hidden md:inline">
                  Aaron
                </span>
                <ChevronDown className="w-4 h-4 text-[#6b7c70] group-hover:rotate-180 transition-transform" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#e8e5e0] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#2d4f3e] hover:bg-[#f1f5f3]"
                >
                  View Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#2d4f3e] hover:bg-[#f1f5f3]"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#2d4f3e] hover:bg-[#f1f5f3]"
                >
                  Help
                </a>
                <div className="my-1 h-px bg-[#e8e5e0]"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      {showSuggestionsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowSuggestionsModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            style={{ border: "1px solid #e8e5e0" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between p-6 border-b"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderColor: "#e8e5e0",
              }}
            >
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "#2d4f3e" }}>
                  What Should I Ask?
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                  Choose from role-based question suggestions or copy them for
                  later
                </p>
              </div>
              <button
                onClick={() => setShowSuggestionsModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: "#6b7280" }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {questionSuggestions.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h3
                      className="text-2xl font-semibold"
                      style={{ color: "#2d4f3e" }}
                    >
                      {category.role}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {category.questions.map((question, qIdx) => (
                      <div
                        key={qIdx}
                        className="group flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#e8e5e0",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#5a8068";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e8e5e0";
                        }}
                      >
                        <MessageCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: "#5a8068" }}
                        />
                        <div className="flex-1">
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#1f2937" }}
                          >
                            {question}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopyQuestion(question)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            style={{ color: "#6b7280" }}
                            title="Copy to clipboard"
                          >
                            {copiedQuestion === question ? (
                              <Check
                                className="w-4 h-4"
                                style={{ color: "#10b981" }}
                              />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleQuestionClick(question)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
                            style={{
                              backgroundColor: "#5a8068",
                              color: "#ffffff",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#4a6f58";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#5a8068";
                            }}
                          >
                            Use
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Info */}
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: "#f1f5f3",
                  border: "1px solid #e8e5e0",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#4a5d50" }}
                >
                  <strong>Tip:</strong> The key is to ask about specific areas
                  where you need clarity or actionable insights. If you're
                  unsure, just describe the challenge or decision you're
                  navigating, and I can help you frame the right question!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-7xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)]">
                <div className="text-center mb-12">
                  <div className="mb-6 relative inline-block">
                    <div
                      className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(90, 108, 95, 0.15) 0%, rgba(101, 123, 106, 0.15) 50%, rgba(142, 178, 140, 0.15) 100%)",
                      }}
                    ></div>

                    <img
                      src="/cwyd.png"
                      alt="Spend Bot"
                      className="w-78 h-78 relative z-10"
                    />
                  </div>

                  <h2
                    className="text-5xl font-bold mb-4 leading-tight"
                    style={{ color: "#2d4f3e" }}
                  >
                    Analytix SpendBot{" "}
                    <span
                      className="text-3xl ml-2"
                      style={{ color: "#a8b5ad" }}
                    >
                      (Preview)
                    </span>
                  </h2>
                  <p
                    className="text-lg max-w-2xl mx-auto leading-relaxed"
                    style={{ color: "#6b7c70" }}
                  >
                    Your enterprise-grade AI assistant for intelligent spend
                    analysis, procurement insights, and data-driven decision
                    making.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
                  <div
                    className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e8e5e0",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#e8f0ff" }}
                      >
                        <TrendingUp
                          className="w-6 h-6"
                          style={{ color: "#3b82f6" }}
                        />
                      </div>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#1f2937" }}
                      >
                        $1.21M
                      </span>
                    </div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#1f2937" }}
                    >
                      Total Spend
                    </h3>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      Fiscal Year 2025
                    </p>
                    <div className="mt-4 flex items-end gap-1 h-12">
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: "45%",
                          backgroundColor: "#bfdbfe",
                        }}
                      ></div>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: "60%",
                          backgroundColor: "#93c5fd",
                        }}
                      ></div>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: "75%",
                          backgroundColor: "#60a5fa",
                        }}
                      ></div>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: "90%",
                          backgroundColor: "#3b82f6",
                        }}
                      ></div>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: "100%",
                          backgroundColor: "#2563eb",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e8e5e0",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#d1fae5" }}
                      >
                        <FileText
                          className="w-6 h-6"
                          style={{ color: "#10b981" }}
                        />
                      </div>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#1f2937" }}
                      >
                        10
                      </span>
                    </div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#1f2937" }}
                    >
                      Active Contracts
                    </h3>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      Across all departments
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#f3f4f6" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "77.98%",
                            background:
                              "linear-gradient(to right, #10b981, #34d399)",
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#10b981" }}
                      >
                        78%
                      </span>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e8e5e0",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "#fae8ff" }}
                      >
                        <BarChart3
                          className="w-6 h-6"
                          style={{ color: "#a855f7" }}
                        />
                      </div>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#1f2937" }}
                      >
                        89
                      </span>
                    </div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#1f2937" }}
                    >
                      Tenders Released
                    </h3>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      This quarter
                    </p>
                    <div className="mt-4 grid grid-cols-5 gap-1 h-12">
                      <div
                        className="rounded"
                        style={{
                          height: "40%",
                          backgroundColor: "#f3e8ff",
                        }}
                      ></div>
                      <div
                        className="rounded"
                        style={{
                          height: "65%",
                          backgroundColor: "#e9d5ff",
                        }}
                      ></div>
                      <div
                        className="rounded"
                        style={{
                          height: "50%",
                          backgroundColor: "#d8b4fe",
                        }}
                      ></div>
                      <div
                        className="rounded"
                        style={{
                          height: "85%",
                          backgroundColor: "#c084fc",
                        }}
                      ></div>
                      <div
                        className="rounded"
                        style={{
                          height: "100%",
                          backgroundColor: "#a855f7",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-3xl">
                  <p
                    className="text-sm font-semibold mb-4 text-center"
                    style={{ color: "#4b5563" }}
                  >
                    Start by asking a question:
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "How many IPP submissions were made FY25?"
                        )
                      }
                      className="w-full text-left p-4 rounded-xl hover:shadow-md transition-all duration-200 group"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8e5e0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#5a8068";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e8e5e0";
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <MessageCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: "#5a8068" }}
                        />
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "#1f2937" }}
                          >
                            How many IPP submissions were made FY25?
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{ color: "#6b7280" }}
                          >
                            Get insights on procurement submissions
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        handleExampleClick(
                          "What's the total spend on non-catalogue items?"
                        )
                      }
                      className="w-full text-left p-4 rounded-xl hover:shadow-md transition-all duration-200 group"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8e5e0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#5a8068";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e8e5e0";
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <MessageCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: "#5a8068" }}
                        />
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "#1f2937" }}
                          >
                            What's the total spend on non-catalogue items?
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{ color: "#6b7280" }}
                          >
                            Analyze spending patterns
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowSuggestionsModal(true)}
                      className="w-full text-left p-5 rounded-2xl hover:shadow-xl transition-all duration-200 group border border-[#d1d5db]"
                      style={{
                        backgroundColor: "#f0f4f8", // subtle blue-gray
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#2563eb"; // corporate blue
                        e.currentTarget.style.backgroundColor = "#e7effc"; // lighter blue
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#d1d5db";
                        e.currentTarget.style.backgroundColor = "#f0f4f8";
                      }}
                    >
                      {/* Blue HELP badge */}
                      <div className="absolute top-2 right-3 bg-[#2563eb] text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm">
                        HELP
                      </div>

                      <div className="flex items-start gap-4">
                        <Lightbulb
                          className="w-8 h-8 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ color: "#2563eb" }} // blue icon
                        />
                        <div>
                          <p
                            className="font-semibold text-lg"
                            style={{ color: "#1e293b" }}
                          >
                            What should I ask?
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{ color: "#475569" }}
                          >
                            Get tips tailored to your role and what you want to
                            achieve.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-24">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: "transparent",
                            padding: "2px",
                          }}
                        >
                          <img
                            src="/anaBot.png"
                            alt="CWYD"
                            className="w-full h-full"
                            style={{
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-medium whitespace-nowrap"
                          style={{ color: "#4a5d50" }}
                        >
                          SpendBot
                        </span>
                      </div>
                    )}

                    <div
                      className={`rounded-xl px-4 py-1 ${
                        msg.role === "user"
                          ? "shadow-md max-w-[70%]"
                          : "shadow-sm max-w-full"
                      }`}
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, #5a8068, #4a6f58)"
                            : "#ffffff",
                        color: msg.role === "user" ? "#ffffff" : "#1f2937",
                        border:
                          msg.role === "user" ? "none" : "1px solid #e5e5e5",
                      }}
                    >
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <div>
                          <div
                            style={{
                              maxHeight: "none",
                              overflow: "visible",
                            }}
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({
                                  node,
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }: any) {
                                  const match = /language-(\w+)/.exec(
                                    className || ""
                                  );
                                  return !inline && match ? (
                                    <div
                                      className="my-4 rounded-xl overflow-hidden"
                                      style={{
                                        border: "1px solid #e8e5e0",
                                        backgroundColor: "#f9fafb",
                                      }}
                                    >
                                      <div
                                        className="flex items-center justify-between px-4 py-2.5 text-xs font-medium"
                                        style={{
                                          color: "#6b7280",
                                          borderBottom: "1px solid #e8e5e0",
                                          backgroundColor: "#ffffff",
                                        }}
                                      >
                                        <span>{match[1]}</span>
                                      </div>
                                      <pre className="p-4 overflow-x-auto">
                                        <code
                                          className="text-sm font-mono"
                                          style={{ color: "#374151" }}
                                        >
                                          {String(children).replace(/\n$/, "")}
                                        </code>
                                      </pre>
                                    </div>
                                  ) : (
                                    <code
                                      className="px-2 py-1 rounded-md text-sm font-mono"
                                      style={{
                                        backgroundColor:
                                          msg.role === "user"
                                            ? "rgba(90, 128, 104, 0.15)"
                                            : "#f3f4f6",
                                        color:
                                          msg.role === "user"
                                            ? "#ffffff"
                                            : "#374151",
                                        border:
                                          msg.role === "user"
                                            ? "1px solid rgba(255, 255, 255, 0.3)"
                                            : "1px solid #e5e7eb",
                                      }}
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                },

                                // ✅ Table rendering
                                table({ children }) {
                                  return (
                                    <div className="overflow-auto my-4">
                                      <table className="w-full text-sm border border-gray-200 text-left">
                                        {children}
                                      </table>
                                    </div>
                                  );
                                },
                                thead({ children }) {
                                  return (
                                    <thead className="bg-gray-100 border-b border-gray-200">
                                      {children}
                                    </thead>
                                  );
                                },
                                tr({ children }) {
                                  return (
                                    <tr className="even:bg-gray-50">
                                      {children}
                                    </tr>
                                  );
                                },
                                th({ children }) {
                                  return (
                                    <th className="px-4 py-2 font-semibold text-gray-700 border border-gray-200 whitespace-nowrap">
                                      {children}
                                    </th>
                                  );
                                },
                                td({ children }) {
                                  return (
                                    <td className="px-4 py-2 text-gray-800 border border-gray-200 whitespace-nowrap">
                                      {children}
                                    </td>
                                  );
                                },
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>

                        {msg.role === "assistant" &&
                          msg.chartData &&
                          msg.chartData.length > 0 && (
                            <ChartView data={msg.chartData} />
                          )}
                      </div>
                    </div>

                    {msg.role === "user" && (
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span
                          className="text-xs font-medium"
                          style={{ color: "#4a5d50" }}
                        >
                          Aaron
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: "transparent",
                          padding: "2px",
                        }}
                      >
                        <img
                          src="/anaBot.png"
                          alt="CWYD"
                          className="w-full h-full"
                          style={{
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium whitespace-nowrap"
                        style={{ color: "#4a5d50" }}
                      ></span>
                    </div>
                    <div
                      className="rounded-2xl px-5 py-3.5 shadow-sm"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e5e5",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full animate-bounce"
                          style={{
                            background:
                              "linear-gradient(135deg, #5a8068, #4a6f58)",
                            animationDelay: "0ms",
                          }}
                        ></div>

                        <div
                          className="w-2.5 h-2.5 rounded-full animate-bounce"
                          style={{
                            background:
                              "linear-gradient(135deg, #5a8068, #4a6f58)",
                            animationDelay: "150ms",
                          }}
                        ></div>

                        <div
                          className="w-2.5 h-2.5 rounded-full animate-bounce"
                          style={{
                            background:
                              "linear-gradient(135deg, #5a8068, #4a6f58)",
                            animationDelay: "300ms",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer
        className="border-t shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderColor: "#e8e5e0",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-3 mb-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your spend data..."
              rows={1}
              className="flex-1 resize-none rounded-xl px-5 py-4 shadow-sm"
              disabled={isLoading}
              style={{
                minHeight: "56px",
                maxHeight: "200px",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                border: "2px solid #e8e5e0",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-14 w-14 rounded-xl shadow-md flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                backgroundColor: "#5a8068",
                color: "#ffffff",
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center">
            <p className="text-xs font-medium" style={{ color: "#6b7c70" }}>
              Powered by Pernix Analytics
            </p>
          </div>
        </div>
      </footer>

      <style>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  /* Hide scrollbar for textarea */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.875rem 1.75rem;
    border-radius: 0.75rem;
    color: white;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: toastAppear 0.3s ease-out forwards;
  }

  @keyframes toastAppear {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  .toast.error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  /* Markdown & prose styling */
  .prose {
    color: inherit;
  }

  .prose p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    line-height: 1.7;
  }

  .prose ul,
  .prose ol {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }

  .prose li {
    margin-top: 0.375em;
    margin-bottom: 0.375em;
    line-height: 1.6;
  }

  .prose code {
    font-size: 0.875em;
  }

  .prose pre {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .prose strong {
    font-weight: 600;
  }

  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4 {
    font-weight: 700;
    line-height: 1.4;
  }

  /* ✅ GPT-style Markdown table formatting */
  .prose table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    display: block;
    margin-top: 1rem;
    font-size: 0.875rem;
  }

  .prose thead {
    background-color: #f3f4f6;
  }

  .prose tr:nth-child(even) {
    background-color: #f9fafb;
  }

  .prose th,
  .prose td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem 1rem;
    text-align: left;
    white-space: nowrap;
    color: #1f2937;
  }

  .prose th {
    font-weight: 600;
    background-color: #f3f4f6;
  }
`}</style>
    </div>
  );
}
