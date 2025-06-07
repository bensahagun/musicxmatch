import axios from "axios";

const BASE_URL = "https://api.musixmatch.com/ws/1.1";
const API_KEY = process.env.MUSIXMATCH_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
    format: "json",
  },
});

export interface Artist {
  artist_id: number;
  artist_name: string;
  artist_country: string;
  artist_alias_list: string[];
}

export interface Album {
  album_id: number;
  album_name: string;
  album_release_date: string;
  album_rating: number;
  artist_id: number;
  artist_name: string;
}

export interface Track {
  track_id: number;
  track_name: string;
  track_rating: number;
  artist_id: number;
  artist_name: string;
  album_id: number;
  album_name: string;
}

export interface ArtistResponse {
  artist: Artist;
}

export interface AlbumResponse {
  album: Album;
}

export interface TrackResponse {
  track: Track;
}

export interface Lyrics {
  lyrics_id: number;
  lyrics_body: string;
  lyrics_language: string;
  script_tracking_url: string;
  pixel_tracking_url: string;
  lyrics_copyright: string;
  updated_time: string;
}

export class MusixMatchService {
  async getChartArtists(country: string = "US", page: number = 1, pageSize: number = 10) {
    try {
      const response = await api.get("/chart.artists.get", {
        params: {
          country,
          page,
          page_size: pageSize,
        },
      });
      return response.data.message.body.artist_list;
    } catch (error) {
      console.error("Error fetching chart artists:", error);
      throw new Error("Failed to fetch chart artists");
    }
  }

  async getArtistAlbums(artistId: number, page: number = 1, pageSize: number = 3) {
    try {
      const response = await api.get("/artist.albums.get", {
        params: {
          artist_id: artistId,
          page,
          page_size: pageSize,
          s_release_date: "desc",
        },
      });
      return response.data.message.body.album_list;
    } catch (error) {
      console.error("Error fetching artist albums:", error);
      throw new Error("Failed to fetch artist albums");
    }
  }

  async getAlbumTracks(albumId: number, page: number = 1, pageSize: number = 20) {
    try {
      const response = await api.get("/album.tracks.get", {
        params: {
          album_id: albumId,
          page,
          page_size: pageSize,
        },
      });
      return response.data.message.body.track_list;
    } catch (error) {
      console.error("Error fetching album tracks:", error);
      throw new Error("Failed to fetch album tracks");
    }
  }

  async getTrackLyrics(trackId: number) {
    try {
      const response = await api.get("/track.lyrics.get", {
        params: {
          track_id: trackId,
        },
      });
      return response.data.message.body.lyrics;
    } catch (error) {
      console.error("Error fetching track lyrics:", error);
      throw new Error("Failed to fetch track lyrics");
    }
  }

  async searchTracks(query: string, page: number = 1, pageSize: number = 20) {
    try {
      const response = await api.get("/track.search", {
        params: {
          q: query,
          page,
          page_size: pageSize,
          s_track_rating: "desc",
        },
      });
      return response.data.message.body.track_list;
    } catch (error) {
      console.error("Error searching tracks:", error);
      throw new Error("Failed to search tracks");
    }
  }
}

export const musixMatchService = new MusixMatchService();
