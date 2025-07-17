import MovieList from './MovieList'
import SearchInput from './SearchInput'
import SearchHistory from './SearchHistory'
import MovieModal from './MovieModal'
import useMovieSearch from '../hooks/useMovieSearch'

const MovieSearch = () => {
  const { movies, loading, error, searchMovies, clearResults, clearError, searchHistory, totalResults, currentPage, totalPages, selectedMovie } = useMovieSearch()

  return (
    <div className="movie-search">
      <SearchInput onSearch={searchMovies} />
      {searchHistory.length > 0 && <SearchHistory history={searchHistory} onSelect={searchMovies} />}
      {loading && <div className="loading">Searching for movies...</div>}
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError} className="error-close">×</button>
        </div>
      )}
      {totalResults > 0 && (
        <div className="search-results-info">
          Found {totalResults} results
          {totalPages > 1 && (
            <span className="pagination-info">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>
      )}
      <MovieList movies={movies} loading={loading} />
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => {}} 
        />
      )}
    </div>
  )
}

export default MovieSearch
