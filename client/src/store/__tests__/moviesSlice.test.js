import { configureStore } from '@reduxjs/toolkit'
import moviesReducer, { searchMovies, getMovieDetails, clearMovies, clearError } from '../moviesSlice'

// Mock fetch
global.fetch = vi.fn()

describe('moviesSlice', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer
      }
    })
    fetch.mockClear()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().movies
      expect(state).toEqual({
        movies: [],
        selectedMovie: null,
        loading: false,
        error: null,
        searchTerm: '',
        totalResults: 0,
        searchHistory: []
      })
    })
  })

  describe('reducers', () => {
    it('should clear movies', () => {
      // First add some movies
      store.dispatch({
        type: 'movies/searchMovies/fulfilled',
        payload: {
          movies: [{ imdbID: '1', Title: 'Test Movie' }],
          searchTerm: 'test',
          totalResults: 1
        }
      })
      
      // Then clear them
      store.dispatch(clearMovies())
      
      const state = store.getState().movies
      expect(state.movies).toEqual([])
      expect(state.error).toBe(null)
      expect(state.totalResults).toBe(0)
    })

    it('should clear error', () => {
      // First set an error
      store.dispatch({
        type: 'movies/searchMovies/rejected',
        payload: 'Test error'
      })
      
      // Then clear it
      store.dispatch(clearError())
      
      const state = store.getState().movies
      expect(state.error).toBe(null)
    })
  })

  describe('searchMovies async thunk', () => {
    it('should handle successful search', async () => {
      const mockResponse = {
        Response: 'True',
        Search: [
          { imdbID: '1', Title: 'Batman', Year: '2005' }
        ],
        totalResults: '1'
      }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })
      
      await store.dispatch(searchMovies('Batman'))
      
      const state = store.getState().movies
      expect(state.loading).toBe(false)
      expect(state.movies).toEqual(mockResponse.Search)
      expect(state.searchTerm).toBe('Batman')
      expect(state.error).toBe(null)
      expect(state.searchHistory).toContain('Batman')
    })

    it('should handle API errors', async () => {
      const mockResponse = {
        Response: 'False',
        Error: 'Movie not found!'
      }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })
      
      await store.dispatch(searchMovies('InvalidMovie'))
      
      const state = store.getState().movies
      expect(state.loading).toBe(false)
      expect(state.error).toBe('Movie not found!')
      expect(state.movies).toEqual([])
    })

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'))
      
      await store.dispatch(searchMovies('Batman'))
      
      const state = store.getState().movies
      expect(state.loading).toBe(false)
      expect(state.error).toBe('Failed to fetch movies. Please check your connection and try again.')
      expect(state.movies).toEqual([])
    })
  })

  describe('getMovieDetails async thunk', () => {
    it('should handle successful movie details fetch', async () => {
      const mockResponse = {
        Response: 'True',
        imdbID: 'tt0372784',
        Title: 'Batman Begins',
        Year: '2005',
        Plot: 'Test plot'
      }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })
      
      await store.dispatch(getMovieDetails('tt0372784'))
      
      const state = store.getState().movies
      expect(state.loading).toBe(false)
      expect(state.selectedMovie).toEqual(mockResponse)
      expect(state.error).toBe(null)
    })

    it('should handle movie details API errors', async () => {
      const mockResponse = {
        Response: 'False',
        Error: 'Movie not found!'
      }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      })
      
      await store.dispatch(getMovieDetails('invalid-id'))
      
      const state = store.getState().movies
      expect(state.loading).toBe(false)
      expect(state.error).toBe('Movie not found!')
    })
  })
})
