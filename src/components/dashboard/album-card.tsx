"use client";

import { useState } from "react";
import { Album, TrackResponse } from "@/lib/musixmatch";
import { TrackCard } from "./track-card";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const [tracks, setTracks] = useState<TrackResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchTracks = async () => {
    if (tracks.length > 0) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/musixmatch/tracks?albumId=${album.album_id}`);
      const data = await response.json();

      if (response.ok) {
        setTracks(data.tracks || []);
        setIsExpanded(true);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg font-medium text-gray-900'>{album.album_name}</h5>
          <p className='text-sm text-gray-600'>Released: {new Date(album.album_release_date).toLocaleDateString()}</p>
          <p className='text-sm text-gray-600'>Rating: {album.album_rating}/100</p>
        </div>
        <button
          onClick={fetchTracks}
          disabled={isLoading}
          className='px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50'
        >
          {isLoading ? "Loading..." : isExpanded ? "Hide Tracks" : "Show Tracks"}
        </button>
      </div>

      {isExpanded && tracks.length > 0 && (
        <div className='mt-4 space-y-2'>
          <h6 className='text-md font-medium text-gray-800'>Tracks</h6>
          <div className='space-y-2'>
            {tracks.map((trackData) => (
              <TrackCard key={trackData.track.track_id} track={trackData.track} />
            ))}
          </div>
        </div>
      )}

      {isExpanded && tracks.length === 0 && !isLoading && (
        <div className='mt-4 text-gray-500 text-center text-sm'>No tracks found for this album.</div>
      )}
    </div>
  );
}
