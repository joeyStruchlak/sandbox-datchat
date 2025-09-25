"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { MessageCircle, X, UserIcon, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const newMessages: Message[] = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: input,
      })
      const reply = res.data.reply
      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (error) {
      showErrorToast("Failed to send message")
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const showErrorToast = (message: string) => {
    const toast = document.createElement("div")
    toast.className = "toast error"
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  const showSuccessToast = (message: string) => {
    const toast = document.createElement("div")
    toast.className = "toast success"
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2000)
  }

  const handleExampleClick = (query: string) => {
    setInput(query)
    inputRef.current?.focus()
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] hover:from-[#183e4a] hover:via-[#387d55] hover:to-[#65a17b] text-white flex items-center justify-center`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                <MessageCircle size={16} />
              </div>
              <h3 className="font-bold">Analytix - SpendBot</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="text-white hover:bg-black/20 h-8 w-8"
              aria-label="Close chat"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <MessageCircle className="h-12 w-12 text-[#387d55] mb-3" />
                <h4 className="text-lg font-bold mb-2">Financial Assistant</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Ask me anything! Chat with your spend data
                </p>
                <div className="w-full space-y-2">
                  <button
                    onClick={() => handleExampleClick("Show post-contract invoices and leakage per supplier")}
                    className="w-full text-left p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-[#183e4a]/10 dark:hover:bg-[#387d55]/20 transition-colors"
                  >
                    Show post-contract invoices and leakage per supplier
                  </button>
                  <button
                    onClick={() => handleExampleClick("Top suppliers by spend with repeated breaches")}
                    className="w-full text-left p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-[#183e4a]/10 dark:hover:bg-[#387d55]/20 transition-colors"
                  >
                    Top suppliers by spend with repeated breaches
                  </button>
                  <button
                    onClick={() =>
                      handleExampleClick("Which suppliers exceeded contract terms twice in the last 12 months?")
                    }
                    className="w-full text-left p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-[#183e4a]/10 dark:hover:bg-[#387d55]/20 transition-colors"
                  >
                    Which suppliers exceeded contract terms twice in the last 12 months?
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <div className="flex items-start">
                        {msg.role === "assistant" && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] flex items-center justify-center mr-2 flex-shrink-0">
                            <MessageCircle size={12} className="text-white" />
                          </div>
                        )}
                        <div>
                          <ReactMarkdown
                            children={msg.content}
                            components={{
                              code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || "")
                                return !inline && match ? (
                                  <div className="my-2 rounded overflow-hidden">
                                    <div className="flex items-center justify-between bg-gray-800 px-2 py-1 text-xs text-gray-200">
                                      <span>{match[1]}</span>
                                    </div>
                                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                                      {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                  </div>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              },
                            }}
                          />
                        </div>
                        {msg.role === "user" && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] flex items-center justify-center ml-2 flex-shrink-0">
                            <UserIcon size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] flex items-center justify-center mr-2 flex-shrink-0">
                          <MessageCircle size={12} className="text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-[#183e4a] animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-[#387d55] animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-[#65a17b] animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#387d55]"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-[#183e4a] via-[#387d55] to-[#65a17b] hover:from-[#183e4a] hover:via-[#387d55] hover:to-[#65a17b] text-white p-2 rounded-md h-9 w-9 flex items-center justify-center"
                aria-label="Send message"
              >
                <BarChart3 size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Toast styles */}
      <style jsx global>{`
        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          z-index: 1000;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

        .toast.success {
          background: linear-gradient(to right, #183e4a, #387d55, #65a17b);
        }

        .toast.error {
          background: #ff4d4d;
        }
      `}</style>
    </div>
  )
}
