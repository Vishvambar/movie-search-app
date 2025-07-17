import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for searching movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchTerm, { rejectWithValue }) => {
    try {
      if (!searchTerm.trim()) {
        return rejectWithValue('Search term cannot be empty')
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      const response = await fetch(
        `${apiBaseUrl}/movies/search?query=${encodeURIComponent(searchTerm)}&page=1`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (data.Response === 'True') {
        return {
          movies: data.Search,
          searchTerm,
          totalResults: parseInt(data.totalResults) || 0,
          currentPage: 1,
          totalPages: Math.ceil(parseInt(data.totalResults) / 10)
        }
      } else {
        return rejectWithValue(data.Error || 'No movies found')
      }
    } catch (error) {
      console.error('Search error:', error)
      return rejectWithValue('Failed to fetch movies. Please check your connection and try again.')
    }
  }
)

// Async thunk for loading more movies (pagination)
export const loadMoreMovies = createAsyncThunk(
  'movies/loadMoreMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { movies: state } = getState()
      const { searchTerm, currentPage, totalPages } = state

      if (!searchTerm || currentPage >= totalPages) {
        return rejectWithValue('No more results to load')
      }

      const nextPage = currentPage + 1
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      const response = await fetch(
        `${apiBaseUrl}/movies/search?query=${encodeURIComponent(searchTerm)}&page=${nextPage}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (data.Response === 'True') {
        return {
          movies: data.Search,
          currentPage: nextPage,
          totalResults: parseInt(data.totalResults) || 0
        }
      } else {
        return rejectWithValue(data.Error || 'No more movies found')
      }
    } catch (error) {
      console.error('Load more error:', error)
      return rejectWithValue('Failed to load more movies. Please try again.')
    }
  }
)

// Async thunk for getting movie details
export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (imdbID, { rejectWithValue }) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      const response = await fetch(`${apiBaseUrl}/movies/${imdbID}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (data.Response === 'True') {
        return data
      } else {
        return rejectWithValue(data.Error || 'Movie not found')
      }
    } catch (error) {
      console.error('Movie details error:', error)
      return rejectWithValue('Failed to fetch movie details.')
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    selectedMovie: null,
    loading: false,
    loadingMore: false,
    error: null,
    searchTerm: '',
    totalResults: 0,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    searchHistory: []
  },
  reducers: {
    clearMovies: (state) => {
      state.movies = []
      state.error = null
      state.totalResults = 0
      state.currentPage = 1
      state.totalPages = 1
      state.hasMore = false
    },
    clearError: (state) => {
      state.error = null
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null
    },
    addToSearchHistory: (state, action) => {
      const term = action.payload
      if (term && !state.searchHistory.includes(term)) {
        state.searchHistory.unshift(term)
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop()
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = []
    }
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.movies
        state.totalResults = action.payload.totalResults
        state.currentPage = action.payload.currentPage
        state.totalPages = action.payload.totalPages
        state.hasMore = action.payload.currentPage < action.payload.totalPages
        state.searchTerm = action.payload.searchTerm
        // Add to search history
        if (action.payload.searchTerm && !state.searchHistory.includes(action.payload.searchTerm)) {
          state.searchHistory.unshift(action.payload.searchTerm)
          if (state.searchHistory.length > 10) {
            state.searchHistory.pop()
          }
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.movies = []
        state.totalResults = 0
        state.currentPage = 1
        state.totalPages = 1
        state.hasMore = false
      })
      // Load more movies
      .addCase(loadMoreMovies.pending, (state) => {
        state.loadingMore = true
        state.error = null
      })
      .addCase(loadMoreMovies.fulfilled, (state, action) => {
        state.loadingMore = false
        state.movies = [...state.movies, ...action.payload.movies]
        state.currentPage = action.payload.currentPage
        state.totalResults = action.payload.totalResults
        state.hasMore = action.payload.currentPage < state.totalPages
      })
      .addCase(loadMoreMovies.rejected, (state, action) => {
        state.loadingMore = false
        state.error = action.payload
      })
      // Get movie details
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false
        state.selectedMovie = action.payload
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { 
  clearMovies, 
  clearError, 
  setSearchTerm, 
  clearSelectedMovie,
  addToSearchHistory,
  clearSearchHistory 
} = moviesSlice.actions

export default moviesSlice.reducer
