import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../../store/moviesSlice'
import MovieCard from '../MovieCard'

const mockMovie = {
  imdbID: 'tt0372784',
  Title: 'Batman Begins',
  Year: '2005',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg'
}

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

const renderWithRedux = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderWithRedux(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('Batman Begins')).toBeInTheDocument()
    expect(screen.getByText('2005')).toBeInTheDocument()
    expect(screen.getByText('movie')).toBeInTheDocument()
    expect(screen.getByAltText('Batman Begins')).toBeInTheDocument()
  })

  it('handles missing poster', () => {
    const movieWithoutPoster = { ...mockMovie, Poster: 'N/A' }
    renderWithRedux(<MovieCard movie={movieWithoutPoster} />)
    
    const image = screen.getByAltText('Batman Begins')
    expect(image).toHaveAttribute('src', '/placeholder-movie.png')
  })
})
