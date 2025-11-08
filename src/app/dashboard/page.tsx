"use client";

import { motion } from "framer-motion";
import Chatbot from "@/components/dashboard/Chatbot";
import InsightCard from "@/components/dashboard/InsightCard";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chatbot Console */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Chatbot />
        </motion.div>

        {/* Insight Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <InsightCard
            title="Revenue"
            value="$2.4M"
            trend="+12%"
            trendDirection="up"
          />
          <InsightCard
            title="Churn"
            value="4%"
            trend="4%"
            trendDirection="down"
          />
          <InsightCard
            title="NPS"
            value="8.4"
            trend="+0.8"
            trendDirection="up"
          />
        </motion.div>
      </div>
    </main>
  );
}

