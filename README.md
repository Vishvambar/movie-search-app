# Movie Search App

A full-stack movie search application built with React and Express.js that allows users to search for movies using the OMDB API.

## Features

- 🎬 Search for movies by title
- 🎯 View movie details including poster, year, and type
- 📱 Responsive design with modern UI
- 🔐 Secure API key handling through backend proxy
- 🛡️ Error boundaries and comprehensive error handling
- 🧪 Unit tests with Vitest and React Testing Library

## Tech Stack

**Frontend:**
- React 19.1.0
- Vite 7.0.4
- CSS3 with modern grid layout
- Vitest for testing

**Backend:**
- Node.js with Express.js
- CORS enabled
- Environment variable configuration
- OMDB API integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OMDB API key (free from [omdbapi.com](http://omdbapi.com/))

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   
   **Client (.env):**
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   ```
   
   **Server (.env):**
   ```
   OMDB_API_KEY=your_omdb_api_key_here
   PORT=3001
   ```

### Development

Start both frontend and backend simultaneously:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend  
npm run client:dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Testing

Run tests:
```bash
npm test
```

### Building for Production

Build the frontend:
```bash
npm run build
```

## Project Structure

```
movie-search-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   └── test/           # Test utilities
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── server/                 # Express backend
│   ├── server.js           # Main server file
│   └── .env                # Server environment variables
└── package.json            # Root package.json
```

## API Endpoints

- `GET /api/movies/search?query=<search_term>` - Search for movies
- `GET /api/movies/:id` - Get movie details by IMDb ID
- `GET /api/health` - Health check endpoint

## Deployment

### Frontend (Vercel/Netlify)

The frontend can be deployed to Vercel or Netlify. Configuration files are included:
- `client/vercel.json` - Vercel configuration
- `client/netlify.toml` - Netlify configuration

### Backend (Vercel/Railway/Heroku)

The backend can be deployed to various platforms:
- Vercel: Uses `server/vercel.json`
- Railway/Heroku: Standard Node.js deployment

**Important:** Update the `VITE_API_BASE_URL` environment variable to point to your deployed backend URL.

## Environment Variables

### Client
- `VITE_API_BASE_URL` - Backend API URL

### Server
- `OMDB_API_KEY` - Your OMDB API key
- `PORT` - Server port (default: 3001)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details
