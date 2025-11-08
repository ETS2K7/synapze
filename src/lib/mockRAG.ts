// Mock company facts for contextual responses
const companyFacts = {
  revenue: {
    current: "$2.4M",
    growth: "12%",
    quarter: "Q4",
    regions: {
      "North America": "+15%",
      "Europe": "+10%",
      "Asia-Pacific": "+8%",
      "Latin America": "+12%",
    },
  },
  churn: {
    current: "4%",
    trend: "decreasing",
    target: "5%",
  },
  nps: {
    current: "8.4",
    change: "+0.8",
    trend: "improving",
  },
  users: {
    total: "1,950",
    growth: "62.5%",
    period: "6 months",
  },
  satisfaction: {
    score: "8.4",
    drivers: ["Response time", "Feature updates"],
  },
};

// Mock data sources
const availableSources = [
  "Finance_Q3.csv",
  "Marketing_Report.pdf",
  "Customer_Analytics_Dashboard.json",
  "Regional_Sales_Data.xlsx",
  "Q4_Financial_Report_2024.pdf",
  "HubSpot_CRM_Export.csv",
  "Notion_Strategy_Docs.md",
  "Stripe_Transaction_Data.json",
];

export interface RAGResponse {
  response: string;
  sources: string[];
  confidence: number;
}

/**
 * Simulates n8n RAG pipeline processing
 * Analyzes query and generates contextual response with sources
 */
export async function processQuery(
  query: string
): Promise<RAGResponse> {
  // Simulate network delay (1-2 seconds)
  const delay = Math.random() * 1000 + 1000; // 1000-2000ms
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lowerQuery = query.toLowerCase();
  let response = "";
  let sources: string[] = [];
  let confidence = 0.85;

  // Revenue/Sales queries
  if (
    lowerQuery.includes("revenue") ||
    lowerQuery.includes("sales") ||
    lowerQuery.includes("income")
  ) {
    response = `Based on your company's data analysis, revenue has shown strong growth this quarter. Current revenue stands at ${companyFacts.revenue.current}, representing a ${companyFacts.revenue.growth} increase compared to the previous quarter. 

Key regional breakdown:
• North America: ${companyFacts.revenue.regions["North America"]} growth
• Europe: ${companyFacts.revenue.regions["Europe"]} growth
• Asia-Pacific: ${companyFacts.revenue.regions["Asia-Pacific"]} growth
• Latin America: ${companyFacts.revenue.regions["Latin America"]} growth

This growth is primarily driven by enterprise sales and expansion in key markets.`;
    sources = ["Finance_Q3.csv", "Regional_Sales_Data.xlsx", "Q4_Financial_Report_2024.pdf"];
    confidence = 0.92;
  }
  // Churn/Retention queries
  else if (
    lowerQuery.includes("churn") ||
    lowerQuery.includes("retention") ||
    lowerQuery.includes("attrition")
  ) {
    response = `Customer churn analysis indicates positive trends. Current churn rate is ${companyFacts.churn.current}, which is ${companyFacts.churn.trend} and below the target threshold of ${companyFacts.churn.target}.

This improvement is attributed to:
• Enhanced customer support initiatives
• Regular product updates and feature releases
• Improved onboarding processes
• Proactive retention campaigns

The downward trend suggests effective retention strategies are in place.`;
    sources = ["Customer_Analytics_Dashboard.json", "HubSpot_CRM_Export.csv"];
    confidence = 0.88;
  }
  // NPS/Satisfaction queries
  else if (
    lowerQuery.includes("nps") ||
    lowerQuery.includes("satisfaction") ||
    lowerQuery.includes("promoter")
  ) {
    response = `Net Promoter Score (NPS) analysis shows strong customer satisfaction. Current NPS is ${companyFacts.nps.current}, representing a ${companyFacts.nps.change} point increase from the previous quarter.

Key satisfaction drivers:
• ${companyFacts.satisfaction.drivers[0]}
• ${companyFacts.satisfaction.drivers[1]}

The ${companyFacts.nps.trend} trend indicates that customer experience improvements are resonating well with your user base.`;
    sources = ["Customer_Analytics_Dashboard.json", "Notion_Strategy_Docs.md"];
    confidence = 0.90;
  }
  // User/Growth queries
  else if (
    lowerQuery.includes("user") ||
    lowerQuery.includes("growth") ||
    lowerQuery.includes("customer count")
  ) {
    response = `User growth metrics show strong expansion. Total active users have reached ${companyFacts.users.total}, representing a ${companyFacts.users.growth} growth over the past ${companyFacts.users.period}.

Growth factors include:
• Successful marketing campaigns
• Product-market fit improvements
• Referral program effectiveness
• Expansion into new markets

The growth trajectory suggests sustainable scaling potential.`;
    sources = ["Customer_Analytics_Dashboard.json", "Marketing_Report.pdf"];
    confidence = 0.87;
  }
  // Regional queries
  else if (
    lowerQuery.includes("region") ||
    lowerQuery.includes("geography") ||
    lowerQuery.includes("location")
  ) {
    response = `Regional performance analysis reveals strong growth across all markets:

• North America: ${companyFacts.revenue.regions["North America"]} revenue growth - Leading market
• Europe: ${companyFacts.revenue.regions["Europe"]} revenue growth - Steady expansion
• Asia-Pacific: ${companyFacts.revenue.regions["Asia-Pacific"]} revenue growth - Emerging opportunity
• Latin America: ${companyFacts.revenue.regions["Latin America"]} revenue growth - Growing presence

North America continues to be the strongest performing region, driven primarily by enterprise sales and strategic partnerships.`;
    sources = ["Regional_Sales_Data.xlsx", "Finance_Q3.csv"];
    confidence = 0.91;
  }
  // Default contextual response
  else {
    response = `I've analyzed your query using Synapze's data pipeline. Based on your company's current metrics:

• Revenue: ${companyFacts.revenue.current} (${companyFacts.revenue.growth} growth)
• Churn Rate: ${companyFacts.churn.current} (${companyFacts.churn.trend})
• NPS Score: ${companyFacts.nps.current} (${companyFacts.nps.change} improvement)
• Active Users: ${companyFacts.users.total}

These metrics indicate strong overall performance with positive trends across key areas. Would you like me to dive deeper into any specific metric or region?`;
    sources = [
      "Finance_Q3.csv",
      "Customer_Analytics_Dashboard.json",
      "Marketing_Report.pdf",
    ];
    confidence = 0.85;
  }

  return {
    response,
    sources,
    confidence,
  };
}

