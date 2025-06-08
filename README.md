# MusixMatch App

A Next.js application that consumes the MusixMatch API to display top charting artists, their latest albums, and song lyrics with user authentication powered by Supabase.

## Features

- **User Authentication**: Registration and login using Supabase
- **Chart Artists**: View top charting artists by country
- **Latest Albums**: Explore the last 3 released albums for each artist
- **Song Lyrics**: Read lyrics for songs included in those albums
- **Country Selection**: Filter artists by different countries
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase
- **API**: MusixMatch API
- **Form Handling**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- MusixMatch API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://gehxiajfozyaiqmytola.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaHhpYWpmb3p5YWlxbXl0b2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjIyNTAsImV4cCI6MjA2NDg5ODI1MH0.jx-hMNgdHB3upR0FBWutSzJ8kLUdW4YLGXCmbVxPbNo


# MusixMatch API (already configured)
MUSIXMATCH_API_KEY=8e343bd24865f49e56ffb12348bb9ccf
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your URL and anon key
3. Update the `.env.local` file with these values
4. The authentication tables will be automatically created by Supabase

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Registration**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View top charting artists for different countries
4. **Explore**: Click "Show Albums" to see an artist's latest albums
5. **Tracks**: Click "Show Tracks" to view songs in an album
6. **Lyrics**: Click "Show Lyrics" to read song lyrics

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── musixmatch/    # MusixMatch API endpoints
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/            # React components
│   ├── auth/             # Authentication forms
│   ├── dashboard/        # Dashboard components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── musixmatch.ts     # MusixMatch API service
│   ├── supabase.ts       # Supabase client config
│   └── supabase-server.ts # Server-side Supabase config
└── store/                # Zustand stores
    └── auth.ts           # Authentication state
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### MusixMatch Data

- `GET /api/musixmatch/artists?country=US` - Get chart artists
- `GET /api/musixmatch/albums?artistId=123` - Get artist albums
- `GET /api/musixmatch/tracks?albumId=456` - Get album tracks
- `GET /api/musixmatch/lyrics?trackId=789` - Get track lyrics

## Environment Variables

| Variable                        | Description                 | Required       |
| ------------------------------- | --------------------------- | -------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL   | Yes            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes            |
| `MUSIXMATCH_API_KEY`            | MusixMatch API key          | Yes (included) |

## Deployment

1. Deploy to Vercel, Netlify, or your preferred platform
2. Set environment variables in your deployment platform
3. Ensure your Supabase project allows the deployment domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes and uses the MusixMatch API under their terms of service.
