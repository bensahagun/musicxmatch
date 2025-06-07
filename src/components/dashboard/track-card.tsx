"use client";

import { useState } from "react";
import { Track, Lyrics } from "@/lib/musixmatch";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const [lyrics, setLyrics] = useState<Lyrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const fetchLyrics = async () => {
    if (lyrics) {
      setShowLyrics(!showLyrics);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/musixmatch/lyrics?trackId=${track.track_id}`);
      const data = await response.json();

      if (response.ok && data.lyrics) {
        setLyrics(data.lyrics);
        setShowLyrics(true);
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-md p-3 border border-gray-300'>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-md font-medium text-gray-900'>{track.track_name}</h6>
          <p className='text-xs text-gray-600'>Rating: {track.track_rating}/100</p>
        </div>
        <button
          onClick={fetchLyrics}
          disabled={isLoading}
          className='px-2 py-1 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50'
        >
          {isLoading ? "Loading..." : showLyrics ? "Hide Lyrics" : "Show Lyrics"}
        </button>
      </div>

      {showLyrics && lyrics && (
        <div className='mt-3 p-3 bg-gray-50 rounded-md'>
          <h6 className='text-sm font-medium text-gray-800 mb-2'>Lyrics</h6>
          <div className='text-sm text-gray-700 whitespace-pre-line max-h-40 overflow-y-auto'>
            {lyrics.lyrics_body || "Lyrics not available"}
          </div>
          {lyrics.lyrics_copyright && <p className='text-xs text-gray-500 mt-2'>{lyrics.lyrics_copyright}</p>}
        </div>
      )}

      {showLyrics && !lyrics && !isLoading && (
        <div className='mt-3 text-gray-500 text-center text-sm'>Lyrics not available for this track.</div>
      )}
    </div>
  );
}
