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
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-purple-300 hover:shadow-md transition-all"
    >
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? "text-purple-600" : "text-red-500"
          }`}
        >
          <span>{isPositive ? "↑" : "↓"}</span>
          <span>{trend}</span>
        </div>
      </div>
    </motion.div>
  );
}

