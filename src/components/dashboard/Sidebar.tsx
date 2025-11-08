"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "insights", label: "Insights", icon: "💡" },
  { id: "data-sources", label: "Data Sources", icon: "📊" },
  { id: "automations", label: "Automations", icon: "⚙️" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900/95 border-r border-gray-700 z-30 transition-all duration-300 ${
          isCollapsed
            ? "w-16 -translate-x-full md:translate-x-0"
            : "w-64 translate-x-0"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-4 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="text-xs">
            {isCollapsed ? "→" : "←"}
          </span>
        </button>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 mt-8">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            const href =
              item.id === "dashboard"
                ? "/dashboard"
                : item.id === "insights"
                ? "/insights"
                : item.id === "settings"
                ? "/settings"
                : "#";

            return (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {href !== "#" ? (
                  <Link
                    href={href}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                )}
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggleCollapse}
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

