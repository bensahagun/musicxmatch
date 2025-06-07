"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Artist } from "@/lib/musixmatch";
import { ArtistCard } from "@/components/dashboard/artist-card";

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isLoading: authLoading, logout } = useAuthStore();
  const router = useRouter();

  // Get user's country from metadata, fallback to US
  const userCountry = user?.user_metadata?.country || "US";

  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }
    fetchArtists();
  }, [user, authLoading, router]);

  const fetchArtists = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/musixmatch/artists?country=${userCountry}`);
      const data = await response.json();

      if (response.ok) {
        setArtists(data.artists || []);
      } else {
        setError(data.error || "Failed to fetch artists");
      }
    } catch {
      setError("Failed to fetch artists");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading while auth is still loading
  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen '>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Music Dashboard</h1>
              <p className='text-gray-600'>Welcome, {user.email}</p>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900'>Top Chart Artists - {userCountry}</h2>
            <p className='text-gray-600'>Discover the latest trending artists and their albums</p>
          </div>

          {isLoading && (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
          )}

          {error && (
            <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
              <p className='text-red-600'>{error}</p>
              <button
                onClick={fetchArtists}
                className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && artists.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500'>No artists found for this country.</p>
            </div>
          )}

          {!isLoading && artists.length > 0 && (
            <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
              {artists.map((artistData: any) => (
                <ArtistCard key={artistData.artist.artist_id} artist={artistData.artist} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
