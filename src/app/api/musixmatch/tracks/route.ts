import { NextRequest, NextResponse } from "next/server";
import { musixMatchService } from "@/lib/musixmatch";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId");

    if (!albumId) {
      return NextResponse.json({ error: "Album ID is required" }, { status: 400 });
    }

    const tracks = await musixMatchService.getAlbumTracks(parseInt(albumId));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
