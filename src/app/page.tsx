import Link from "next/link";

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>MusixMatch App</h1>
          <p className='text-gray-600 mb-8'>
            Discover top chart artists, explore their latest albums, and read song lyrics from around the world.
          </p>

          <div className='space-y-4'>
            <Link
              href='/login'
              className='w-full block bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium'
            >
              Sign In
            </Link>

            <Link
              href='/register'
              className='w-full block bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium'
            >
              Create Account
            </Link>
          </div>

          <div className='mt-8 text-sm text-gray-500'>
            <p>Features:</p>
            <ul className='mt-2 space-y-1'>
              <li>• View top charting artists by country</li>
              <li>• Explore latest albums</li>
              <li>• Read song lyrics</li>
              <li>• User authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
