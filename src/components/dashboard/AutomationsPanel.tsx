"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Automation {
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: "active" | "running" | "paused" | "error";
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Weekly Summary",
    description: "Send AI insight report every Monday",
    schedule: "Mon 9 AM",
    status: "active",
  },
  {
    id: "2",
    name: "Alert System",
    description: "Notify when churn > 10%",
    schedule: "Real-time",
    status: "running",
  },
  {
    id: "3",
    name: "Meeting Brief",
    description: "Generate strategy brief for monthly review",
    schedule: "Monthly",
    status: "active",
  },
  {
    id: "4",
    name: "Revenue Report",
    description: "Daily revenue summary to stakeholders",
    schedule: "Daily 8 AM",
    status: "active",
  },
  {
    id: "5",
    name: "Anomaly Detection",
    description: "Alert on unusual metric patterns",
    schedule: "Real-time",
    status: "paused",
  },
];

export default function AutomationsPanel() {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "✅";
      case "running":
        return "🟡";
      case "paused":
        return "⏸️";
      case "error":
        return "❌";
      default:
        return "⚪";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "running":
        return "Running";
      case "paused":
        return "Paused";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-purple-600";
      case "running":
        return "text-yellow-400";
      case "paused":
        return "text-gray-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const handleToggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id
          ? {
              ...auto,
              status:
                auto.status === "active"
                  ? "paused"
                  : auto.status === "paused"
                  ? "active"
                  : auto.status,
            }
          : auto
      )
    );
  };

  const handleRunNow = (id: string) => {
    // In a real app, this would trigger the automation
    console.log(`Running automation: ${id}`);
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, status: "running" as const } : auto
      )
    );
    // Simulate running state
    setTimeout(() => {
      setAutomations((prev) =>
        prev.map((auto) =>
          auto.id === id ? { ...auto, status: "active" as const } : auto
        )
      );
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Automations</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your automated workflows and scheduled tasks
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Automation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {automations.map((automation, index) => (
                <motion.tr
                  key={automation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {automation.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {automation.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {automation.schedule}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(automation.status)}</span>
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          automation.status
                        )}`}
                      >
                        {getStatusText(automation.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRunNow(automation.id)}
                        className="px-3 py-1.5 text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 rounded-md transition-colors"
                      >
                        Run Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleToggleStatus(automation.id)}
                        className="px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded-md transition-colors"
                      >
                        {automation.status === "active" ? "Pause" : "Activate"}
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {automation.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span>{getStatusIcon(automation.status)}</span>
                  <span
                    className={`text-xs font-medium ${getStatusColor(
                      automation.status
                    )}`}
                  >
                    {getStatusText(automation.status)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {automation.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {automation.schedule}
                </span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRunNow(automation.id)}
                    className="px-3 py-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 rounded-md transition-colors"
                  >
                    Run Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleStatus(automation.id)}
                    className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 rounded-md transition-colors"
                  >
                    {automation.status === "active" ? "Pause" : "Activate"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            + Create Automation
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

