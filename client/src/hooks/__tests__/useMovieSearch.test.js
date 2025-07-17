import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../../store/moviesSlice'
import useMovieSearch from '../useMovieSearch'

// Mock fetch
global.fetch = vi.fn()

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      movies: moviesReducer
    },
    preloadedState: {
      movies: {
        movies: [],
        selectedMovie: null,
        loading: false,
        error: null,
        searchTerm: '',
        totalResults: 0,
        searchHistory: [],
        ...initialState
      }
    }
  })
}

const renderHookWithRedux = (hook, store = createMockStore()) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  )
  return renderHook(hook, { wrapper })
}

describe('useMovieSearch', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('should initialize with empty state', () => {
    const { result } = renderHookWithRedux(() => useMovieSearch())
    
    expect(result.current.movies).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should handle successful search', async () => {
    const mockResponse = {
      Response: 'True',
      Search: [
        { imdbID: '1', Title: 'Batman', Year: '2005' }
      ]
    }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    const { result } = renderHookWithRedux(() => useMovieSearch())
    
    await act(async () => {
      await result.current.searchMovies('Batman')
    })
    
    expect(result.current.movies).toEqual(mockResponse.Search)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
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
    
    const { result } = renderHookWithRedux(() => useMovieSearch())
    
    await act(async () => {
      await result.current.searchMovies('InvalidMovie')
    })
    
    expect(result.current.movies).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('Movie not found!')
  })

  it('should handle network errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    
    const { result } = renderHookWithRedux(() => useMovieSearch())
    
    await act(async () => {
      await result.current.searchMovies('Batman')
    })
    
    expect(result.current.movies).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('Failed to fetch movies. Please check your connection and try again.')
  })
})
