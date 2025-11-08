"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface DataSource {
  id: string;
  source: string;
  type: string;
  status: "connected" | "syncing" | "error";
  lastSync: string;
}

const initialDataSources: DataSource[] = [
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
    status: "connected",
    lastSync: "15 min ago",
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
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());

  const handleSyncNow = async (sourceId: string) => {
    if (syncingIds.has(sourceId)) return;

    setSyncingIds((prev) => new Set(prev).add(sourceId));

    // Update status to syncing
    setDataSources((prev) =>
      prev.map((source) =>
        source.id === sourceId ? { ...source, status: "syncing" as const } : source
      )
    );

    toast.loading("Syncing data sources...", { id: "sync-loading" });

    // Simulate backend sync (2 seconds)
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((source) =>
          source.id === sourceId
            ? {
                ...source,
                status: "connected" as const,
                lastSync: "Just now",
              }
            : source
        )
      );

      setSyncingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sourceId);
        return newSet;
      });

      toast.success("Sync completed!", { id: "sync-loading" });
    }, 2000);
  };

  const handleSyncAll = async () => {
    if (syncingIds.size > 0) return;

    const allIds = dataSources.map((s) => s.id);
    setSyncingIds(new Set(allIds));

    // Update all to syncing
    setDataSources((prev) =>
      prev.map((source) => ({ ...source, status: "syncing" as const }))
    );

    toast.loading("Syncing all data sources...", { id: "sync-all-loading" });

    // Simulate backend sync (2 seconds)
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((source) => ({
          ...source,
          status: "connected" as const,
          lastSync: "Just now",
        }))
      );

      setSyncingIds(new Set());
      toast.success("All sources synced!", { id: "sync-all-loading" });
    }, 2000);
  };
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
        return "text-purple-600";
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
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Data Sources</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor your connected data sources
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            <tbody className="divide-y divide-gray-200">
              {dataSources.map((source, index) => (
                <motion.tr
                  key={source.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {source.source}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{source.type}</div>
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
                      {source.status === "syncing" && (
                        <span className="text-xs text-yellow-600 animate-pulse">
                          Syncing...
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-600">{source.lastSync}</div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSyncNow(source.id)}
                        disabled={syncingIds.has(source.id)}
                        className="text-xs px-2 py-1 bg-purple-50 hover:bg-purple-100 disabled:bg-gray-200 disabled:cursor-not-allowed text-purple-600 border border-purple-200 rounded transition-colors"
                      >
                        {syncingIds.has(source.id) ? "Syncing..." : "Sync Now"}
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSyncAll}
            disabled={syncingIds.size > 0}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            {syncingIds.size > 0 ? "Syncing All..." : "Sync All Sources"}
          </motion.button>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors">
            + Add Data Source
          </button>
        </div>
      </div>
    </motion.div>
  );
}

