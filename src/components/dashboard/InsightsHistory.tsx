"use client";

import { motion } from "framer-motion";

interface Insight {
  id: string;
  query: string;
  summary: string;
  timestamp: string;
  date: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    query: "Why did churn rise in Q3?",
    summary: "Downtime spikes in July.",
    timestamp: "2:30 PM",
    date: "Today",
  },
  {
    id: "2",
    query: "Best-performing region?",
    summary: "APAC (+18% revenue).",
    timestamp: "11:15 AM",
    date: "Today",
  },
  {
    id: "3",
    query: "Marketing ROI trend?",
    summary: "+24% since May.",
    timestamp: "9:45 AM",
    date: "Today",
  },
  {
    id: "4",
    query: "Customer satisfaction drivers?",
    summary: "Response time and feature updates.",
    timestamp: "4:20 PM",
    date: "Yesterday",
  },
  {
    id: "5",
    query: "Revenue forecast for Q4?",
    summary: "Projected $2.8M based on current trends.",
    timestamp: "1:10 PM",
    date: "Yesterday",
  },
  {
    id: "6",
    query: "Top conversion channels?",
    summary: "Organic search (42%), Direct (28%), Paid (20%).",
    timestamp: "10:00 AM",
    date: "2 days ago",
  },
  {
    id: "7",
    query: "User engagement patterns?",
    summary: "Peak usage: Tuesday-Thursday, 2-4 PM.",
    timestamp: "3:45 PM",
    date: "3 days ago",
  },
  {
    id: "8",
    query: "Cost per acquisition trend?",
    summary: "Decreased 15% over last quarter.",
    timestamp: "11:30 AM",
    date: "4 days ago",
  },
];

export default function InsightsHistory() {
  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to a detailed view
    console.log(`Viewing details for insight: ${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="border-b border-gray-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Insights History</h2>
          <p className="text-sm text-gray-400 mt-1">
            View past queries and AI-generated insights
          </p>
        </div>

        {/* Scrollable List */}
        <div className="max-h-[600px] overflow-y-auto">
          <div className="divide-y divide-gray-700">
            {mockInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Query */}
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-cyan-400 text-lg mt-0.5">💡</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white mb-1">
                          {insight.query}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {insight.summary}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-2 ml-8 mt-2">
                      <span className="text-xs text-gray-500">
                        {insight.date}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {insight.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(insight.id)}
                    className="px-4 py-2 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 rounded-lg transition-colors whitespace-nowrap"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 px-6 py-4 bg-gray-900/30">
          <p className="text-sm text-gray-400 text-center">
            Showing {mockInsights.length} insights
          </p>
        </div>
      </div>
    </motion.div>
  );
}

