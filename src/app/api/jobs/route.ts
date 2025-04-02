import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_CORESIGNAL_TOKEN;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_CORESIGNAL_BASE_URL;

  if (!API_KEY || !apiUrl) {
    return NextResponse.json(
      { error: "Server configuration error", message: "API key not provided" },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}
