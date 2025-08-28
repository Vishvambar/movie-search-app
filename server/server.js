import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// ✅ Allowed origins (Netlify + Localhost)
const allowedOrigins = [
  "https://movie-search-vishvambar.netlify.app", // deployed frontend
  "http://localhost:5173" // local dev
]

app.use(cors());


app.use(express.json())

// 🎬 Movie search endpoint
app.get('/api/movies/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' })
    }

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    )
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 🎬 Movie details endpoint
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`
    )
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error fetching movie details:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 🩺 Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
