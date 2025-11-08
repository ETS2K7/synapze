import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Synapze
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/insights"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/settings"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

