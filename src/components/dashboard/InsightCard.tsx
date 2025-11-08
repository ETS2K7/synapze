"use client";

import { motion } from "framer-motion";

interface InsightCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
}

export default function InsightCard({
  title,
  value,
  trend,
  trendDirection,
}: InsightCardProps) {
  const isPositive = trendDirection === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-colors"
    >
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? "text-cyan-400" : "text-red-400"
          }`}
        >
          <span>{isPositive ? "↑" : "↓"}</span>
          <span>{trend}</span>
        </div>
      </div>
    </motion.div>
  );
}

