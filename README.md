# Synapze

A modern, AI-powered analytics dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Transform your data into actionable insights with an intuitive interface and intelligent chatbot.

## 🚀 Features

### Core Functionality
- **AI Chatbot Console** - Ask questions in natural language and get instant insights
- **Persistent Chat Memory** - Conversations saved locally using localStorage
- **Real-time Analytics** - Beautiful charts and visualizations with Recharts
- **Data Sources Management** - Connect and sync multiple data sources
- **Automations** - Schedule and automate workflows
- **Insights History** - View past queries and AI-generated insights
- **Settings Panel** - Customize notifications, preferences, and data retention

### Design
- **Klap.app-inspired Theme** - Clean, modern light theme with purple accents
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion animations throughout
- **Dark/Light Theme Ready** - Built with Tailwind CSS for easy theme switching

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Notifications**: react-hot-toast
- **State Management**: React Hooks

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
synapze-frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # Chat API endpoint
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Main dashboard
│   │   ├── insights/
│   │   │   └── page.tsx              # Insights page
│   │   ├── settings/
│   │   │   └── page.tsx              # Settings page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── Navbar.tsx                # Navigation bar
│   │   └── dashboard/
│   │       ├── Sidebar.tsx           # Navigation sidebar
│   │       ├── Chatbot.tsx               # AI chatbot console
│   │       ├── InsightCard.tsx           # KPI cards
│   │       ├── MiniAnalytics.tsx         # Analytics charts
│   │       ├── DataSourcesPanel.tsx      # Data sources management
│   │       ├── AutomationsPanel.tsx      # Automations management
│   │       └── InsightsHistory.tsx       # Past insights list
│   └── lib/
│       └── mockRAG.ts                 # Mock RAG pipeline
├── public/                            # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Features showcase
- Modern, clean design

### Dashboard (`/dashboard`)
- AI Chatbot Console with persistent memory
- Insight summary cards (Revenue, Churn, NPS)
- Mini analytics charts
- Sidebar navigation

### Insights (`/insights`)
- Complete insights history
- Past queries and summaries
- View details functionality

### Settings (`/settings`)
- Notification preferences
- Data retention settings
- Language and timezone configuration

## 🔌 API Routes

### `/api/chat`
POST endpoint for chatbot queries

**Request:**
```json
{
  "message": "What are the key insights?",
  "context": ["previous", "messages"]
}
```

**Response:**
```json
{
  "response": "AI-generated response...",
  "sources": ["source1.pdf", "source2.csv"],
  "confidence": 0.92,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🎯 Key Components

### Chatbot
- Real-time conversation interface
- localStorage persistence
- API integration ready
- Source citations sidebar

### Analytics
- Revenue trend charts
- User growth visualization
- Churn tracking
- NPS score monitoring

### Data Sources
- Multi-source integration
- Sync functionality
- Status monitoring
- Last sync timestamps

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
```

### Customization
- **Colors**: Update `tailwind.config.ts` for theme colors
- **Mock Data**: Modify `src/lib/mockRAG.ts` for different responses
- **Components**: All components are modular and easily customizable

## 🚦 Development

```bash
# Start dev server
npm run dev

# Type checking
npm run build

# Linting
npm run lint
```

## 📝 Notes

- Chat history persists in browser localStorage
- All data sources and automations use mock data
- API endpoints are ready for backend integration
- Responsive design tested on mobile, tablet, and desktop

## 🔮 Future Enhancements

- Real n8n RAG pipeline integration
- Vector database connectivity
- User authentication
- Real-time data synchronization
- Advanced analytics features
- Export functionality
- Custom dashboard layouts

## 📄 License

MIT

## 👥 Contributors

Built with ❤️ for data-driven decision making.
