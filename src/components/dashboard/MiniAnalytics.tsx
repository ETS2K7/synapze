"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const revenueData = [
  { month: "Jan", value: 1.8 },
  { month: "Feb", value: 2.0 },
  { month: "Mar", value: 2.1 },
  { month: "Apr", value: 2.2 },
  { month: "May", value: 2.3 },
  { month: "Jun", value: 2.4 },
];

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1350 },
  { month: "Mar", users: 1500 },
  { month: "Apr", users: 1650 },
  { month: "May", users: 1800 },
  { month: "Jun", users: 1950 },
];

const churnData = [
  { month: "Jan", churn: 6.2 },
  { month: "Feb", churn: 5.8 },
  { month: "Mar", churn: 5.5 },
  { month: "Apr", churn: 5.0 },
  { month: "May", churn: 4.5 },
  { month: "Jun", churn: 4.0 },
];

const npsData = [
  { month: "Jan", score: 7.2 },
  { month: "Feb", score: 7.5 },
  { month: "Mar", score: 7.8 },
  { month: "Apr", score: 8.0 },
  { month: "May", score: 8.2 },
  { month: "Jun", score: 8.4 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
        <p className="text-gray-900 text-sm">{`${payload[0].value}${payload[0].name === "value" ? "M" : payload[0].name === "users" ? "" : payload[0].name === "churn" ? "%" : ""}`}</p>
      </div>
    );
  }
  return null;
};

export default function MiniAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-500 mb-2">Revenue Trend</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                  <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9333ea"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Last 6 months</p>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-500 mb-2">User Growth</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <Bar dataKey="users" fill="#9333ea" radius={[4, 4, 0, 0]} />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Active users</p>
        </motion.div>

        {/* Churn Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-500 mb-2">Churn Trend</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnData}>
                <Line
                  type="monotone"
                  dataKey="churn"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 3 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Monthly churn %</p>
        </motion.div>

        {/* NPS Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <h4 className="text-sm font-medium text-gray-500 mb-2">NPS Score</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={npsData}>
                <defs>
                  <linearGradient id="colorNPS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#9333ea"
                  fillOpacity={1}
                  fill="url(#colorNPS)"
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">Customer satisfaction</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

