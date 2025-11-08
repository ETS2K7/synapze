"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What are the key insights from last quarter?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "ai",
    content:
      "Based on the data analysis, here are the key insights from Q4:\n\n1. Revenue increased by 12% compared to the previous quarter\n2. Customer churn rate decreased to 4%\n3. Net Promoter Score (NPS) improved to 8.4\n\nThese metrics indicate strong growth and customer satisfaction.",
    timestamp: "10:30 AM",
  },
  {
    id: "3",
    role: "user",
    content: "Can you break down the revenue growth by region?",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "ai",
    content:
      "Revenue growth by region:\n\n• North America: +15%\n• Europe: +10%\n• Asia-Pacific: +8%\n• Latin America: +12%\n\nNorth America showed the strongest growth, driven primarily by enterprise sales.",
    timestamp: "10:32 AM",
  },
];

const mockSources: Source[] = [
  {
    id: "1",
    title: "Q4 Financial Report 2024",
    url: "#",
  },
  {
    id: "2",
    title: "Customer Analytics Dashboard",
    url: "#",
  },
  {
    id: "3",
    title: "Regional Sales Data",
    url: "#",
  },
];

export default function Chatbot() {
  const [messages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSend = () => {
    if (inputValue.trim()) {
      // In a real app, this would send the message to an API
      console.log("Sending:", inputValue);
      setInputValue("");
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
        className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm"
      >
        {/* Header */}
        <div className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Chatbot Console</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-700/50"
          >
            {isSidebarOpen ? "Hide" : "Show"} Sources
          </button>
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
                        ? "bg-cyan-500/20 text-white border border-cyan-500/30"
                        : "bg-gray-700/50 text-gray-100 border border-gray-600"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
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
                className="border-l border-gray-700 bg-gray-900/50 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Sources / Citations
                  </h3>
                  <div className="space-y-2">
                    {mockSources.map((source) => (
                      <motion.a
                        key={source.id}
                        href={source.url}
                        whileHover={{ x: 4 }}
                        className="block p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {source.title}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Send
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

