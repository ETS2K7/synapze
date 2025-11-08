"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn your data into
              <span className="text-purple-600"> actionable insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Synapze is your AI-powered analytics dashboard that transforms
              complex data into clear, actionable insights. Ask questions, get
              answers, and make data-driven decisions faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/dashboard"
                  className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/insights"
                  className="inline-block px-8 py-3 bg-white hover:bg-gray-50 text-purple-600 font-semibold rounded-lg border-2 border-purple-600 transition-colors"
                >
                  View Insights
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to understand your data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💬",
                title: "AI Chatbot",
                description:
                  "Ask questions in natural language and get instant insights from your data. Our AI understands context and provides accurate answers.",
              },
              {
                icon: "📊",
                title: "Real-time Analytics",
                description:
                  "Visualize your data with beautiful charts and graphs. Track KPIs, trends, and metrics in real-time with our comprehensive analytics dashboard.",
              },
              {
                icon: "🔗",
                title: "Data Integration",
                description:
                  "Connect multiple data sources seamlessly. Sync with Google Sheets, HubSpot, Stripe, and more. All your data in one place.",
              },
              {
                icon: "⚙️",
                title: "Automations",
                description:
                  "Automate your workflows and reports. Set up scheduled insights, alerts, and automated data processing to save time and stay informed.",
              },
              {
                icon: "💡",
                title: "Smart Insights",
                description:
                  "Get AI-generated insights and recommendations. Our system analyzes patterns and suggests actions to improve your business metrics.",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description:
                  "Your data is encrypted and secure. We follow industry best practices to ensure your information remains private and protected.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of teams using Synapze to make better data-driven
              decisions.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
              >
                Launch Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
