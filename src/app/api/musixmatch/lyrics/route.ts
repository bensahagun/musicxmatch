import { NextRequest, NextResponse } from "next/server";
import { musixMatchService } from "@/lib/musixmatch";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");

    if (!trackId) {
      return NextResponse.json({ error: "Track ID is required" }, { status: 400 });
    }

    const lyrics = await musixMatchService.getTrackLyrics(parseInt(trackId));

    return NextResponse.json({ lyrics });
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return NextResponse.json({ error: "Failed to fetch lyrics" }, { status: 500 });
  }
}
