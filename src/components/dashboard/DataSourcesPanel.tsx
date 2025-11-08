"use client";

import { motion } from "framer-motion";

interface DataSource {
  id: string;
  source: string;
  type: string;
  status: "connected" | "syncing" | "error";
  lastSync: string;
}

const mockDataSources: DataSource[] = [
  {
    id: "1",
    source: "Google Sheets",
    type: "Finance",
    status: "connected",
    lastSync: "2 min ago",
  },
  {
    id: "2",
    source: "HubSpot CRM",
    type: "Sales",
    status: "connected",
    lastSync: "5 min ago",
  },
  {
    id: "3",
    source: "Notion Docs",
    type: "Marketing",
    status: "syncing",
    lastSync: "—",
  },
  {
    id: "4",
    source: "Stripe API",
    type: "Finance",
    status: "connected",
    lastSync: "1 min ago",
  },
  {
    id: "5",
    source: "Slack Workspace",
    type: "Communication",
    status: "connected",
    lastSync: "10 min ago",
  },
];

export default function DataSourcesPanel() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return "✅";
      case "syncing":
        return "🟡";
      case "error":
        return "❌";
      default:
        return "⚪";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "syncing":
        return "Syncing";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-cyan-400";
      case "syncing":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
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
          <h2 className="text-xl font-semibold text-white">Data Sources</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage and monitor your connected data sources
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockDataSources.map((source, index) => (
                <motion.tr
                  key={source.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {source.source}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{source.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(source.status)}</span>
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          source.status
                        )}`}
                      >
                        {getStatusText(source.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{source.lastSync}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-700 px-6 py-4 bg-gray-900/30">
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors">
            + Add Data Source
          </button>
        </div>
      </div>
    </motion.div>
  );
}

