import { NextRequest, NextResponse } from "next/server";
import { processQuery } from "@/lib/mockRAG";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    // Validate request
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Process query through mock RAG pipeline
    const result = await processQuery(message);

    // Return structured response
    return NextResponse.json({
      response: result.response,
      sources: result.sources,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

