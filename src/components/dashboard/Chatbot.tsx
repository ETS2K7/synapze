"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

interface Source {
  id: string;
  title: string;
  url: string;
}

interface ChatAPIResponse {
  response: string;
  sources: string[];
  confidence: number;
  timestamp: string;
}

const STORAGE_KEY = "synapze_chat_history";

const defaultMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What are the key insights from last quarter?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
  {
    id: "2",
    role: "ai",
    content:
      "Based on the data analysis, here are the key insights from Q4:\n\n1. Revenue increased by 12% compared to the previous quarter\n2. Customer churn rate decreased to 4%\n3. Net Promoter Score (NPS) improved to 8.4\n\nThese metrics indicate strong growth and customer satisfaction.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
  {
    id: "3",
    role: "user",
    content: "Can you break down the revenue growth by region?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
  {
    id: "4",
    role: "ai",
    content:
      "Revenue growth by region:\n\n• North America: +15%\n• Europe: +10%\n• Asia-Pacific: +8%\n• Latin America: +12%\n\nNorth America showed the strongest growth, driven primarily by enterprise sales.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];


export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed);
        } catch (error) {
          console.error("Error loading chat history:", error);
          setMessages(defaultMessages);
        }
      } else {
        setMessages(defaultMessages);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // Add user message immediately
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      const currentInput = inputValue.trim();
      setInputValue("");
      setIsLoading(true);

      // Show loading toast
      toast.loading("Connecting to Synapze backend...", { id: "chat-loading" });

      try {
        // Call API
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";
        const response = await fetch(`${backendUrl}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInput,
            context: messages
              .filter((m) => m.role === "user")
              .slice(-3)
              .map((m) => m.content),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ChatAPIResponse = await response.json();

        // Update sources from API response
        const newSources: Source[] = data.sources.map((source, index) => ({
          id: (Date.now() + index).toString(),
          title: source,
          url: "#",
        }));
        setSources(newSources);

        // Add AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([...newMessages, aiResponse]);

        // Show success toast
        toast.success("Response received!", { id: "chat-loading" });
      } catch (error) {
        console.error("Chat API error:", error);
        toast.error("Error: backend unreachable.", { id: "chat-loading" });

        // Fallback: show error message in chat
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content:
            "I'm sorry, I'm having trouble connecting to the backend right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([...newMessages, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      setMessages(defaultMessages);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Chatbot Console</h2>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearChat}
              className="text-sm text-red-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50"
            >
              Clear Chat
            </motion.button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-sm text-purple-600 hover:text-purple-700 transition-colors px-3 py-1.5 rounded-md hover:bg-purple-50"
            >
              {isSidebarOpen ? "Hide" : "Show"} Sources
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex h-[500px]">
          {/* Conversation Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user"
                        ? "bg-purple-50 text-gray-900 border border-purple-200"
                        : "bg-gray-50 text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-50 text-gray-800 border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                      <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapsible Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-l border-gray-200 bg-gray-50 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Sources / Citations
                  </h3>
                  <div className="space-y-2">
                    {sources.length > 0 ? (
                      sources.map((source) => (
                        <motion.a
                          key={source.id}
                          href={source.url}
                          whileHover={{ x: 4 }}
                          className="block p-2 rounded-md bg-white hover:bg-purple-50 text-sm text-purple-600 hover:text-purple-700 border border-gray-200 hover:border-purple-200 transition-colors"
                        >
                          {source.title}
                        </motion.a>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No sources yet</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              {isLoading ? "Sending..." : "Send"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

