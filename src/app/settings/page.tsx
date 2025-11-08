"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import toast from "react-hot-toast";

export default function Settings() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weeklyReport: true,
    },
    dataRetention: "90",
    theme: "light",
    language: "en",
    timezone: "UTC",
  });

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

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      notifications: {
        email: true,
        push: false,
        weeklyReport: true,
      },
      dataRetention: "90",
      theme: "light",
      language: "en",
      timezone: "UTC",
    });
    toast.success("Settings reset to defaults");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        activeTab="settings"
        onTabChange={() => {}}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your account preferences and application settings
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Notifications */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: "Email Notifications",
                        description: "Receive updates and alerts via email",
                      },
                      {
                        key: "push",
                        label: "Push Notifications",
                        description: "Get real-time notifications in your browser",
                      },
                      {
                        key: "weeklyReport",
                        label: "Weekly Report",
                        description: "Receive a weekly summary of your insights",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              settings.notifications[
                                item.key as keyof typeof settings.notifications
                              ]
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                notifications: {
                                  ...settings.notifications,
                                  [item.key]:
                                    e.target.checked,
                                },
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Data Management */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Data Management
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Retention Period
                      </label>
                      <select
                        value={settings.dataRetention}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            dataRetention: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">1 year</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        How long to keep your data before automatic deletion
                      </p>
                    </div>
                  </div>
                </section>

                {/* Preferences */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          setSettings({ ...settings, language: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          setSettings({ ...settings, timezone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors"
                  >
                    Reset to Defaults
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
