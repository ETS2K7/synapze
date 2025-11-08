"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import Chatbot from "@/components/dashboard/Chatbot";
import InsightCard from "@/components/dashboard/InsightCard";
import DataSourcesPanel from "@/components/dashboard/DataSourcesPanel";
import AutomationsPanel from "@/components/dashboard/AutomationsPanel";
import InsightsHistory from "@/components/dashboard/InsightsHistory";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Set active tab based on current path
    if (pathname === "/dashboard") {
      setActiveTab("dashboard");
    } else if (pathname === "/insights") {
      setActiveTab("insights");
    } else if (pathname === "/settings") {
      setActiveTab("settings");
    }
  }, [pathname]);

  // Collapse sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
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
          </>
        );
      case "insights":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InsightsHistory />
          </motion.div>
        );
      case "data-sources":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DataSourcesPanel />
          </motion.div>
        );
      case "automations":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AutomationsPanel />
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">Content coming soon...</p>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </main>
  );
}

