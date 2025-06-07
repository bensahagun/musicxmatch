"use client";

import { useState } from "react";
import { Artist, AlbumResponse } from "@/lib/musixmatch";
import { AlbumCard } from "./album-card";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchAlbums = async () => {
    if (albums.length > 0) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/musixmatch/albums?artistId=${artist.artist_id}`);
      const data = await response.json();

      if (response.ok) {
        setAlbums(data.albums || []);
        setIsExpanded(true);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900'>{artist.artist_name}</h3>
          <p className='text-gray-600'>{artist.artist_country}</p>
        </div>
        <button
          onClick={fetchAlbums}
          disabled={isLoading}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        >
          {isLoading ? "Loading..." : isExpanded ? "Hide Albums" : "Show Albums"}
        </button>
      </div>

      {isExpanded && albums.length > 0 && (
        <div className='mt-6 space-y-4'>
          <h4 className='text-lg font-medium text-gray-800'>Latest Albums</h4>
          <div className='grid gap-4'>
            {albums.map((albumData) => (
              <AlbumCard key={albumData.album.album_id} album={albumData.album} />
            ))}
          </div>
        </div>
      )}

      {isExpanded && albums.length === 0 && !isLoading && (
        <div className='mt-6 text-gray-500 text-center'>No albums found for this artist.</div>
      )}
    </div>
  );
}
