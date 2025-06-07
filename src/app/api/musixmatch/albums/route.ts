import { NextRequest, NextResponse } from "next/server";
import { musixMatchService } from "@/lib/musixmatch";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get("artistId");

    if (!artistId) {
      return NextResponse.json({ error: "Artist ID is required" }, { status: 400 });
    }

    const albums = await musixMatchService.getArtistAlbums(parseInt(artistId), 1, 3);

    return NextResponse.json({ albums });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}
