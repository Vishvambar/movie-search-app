import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useMovieSearch from '../hooks/useMovieSearch'

const MovieList = ({ movies, loading }) => {
  const { loadMoreMovies, hasMore, loadingMore } = useMovieSearch()
  
  const lastElementRef = useInfiniteScroll(
    loadMoreMovies,
    hasMore,
    loadingMore
  )

  if (loading) {
    return (
      <div className="movie-list">
        {Array(8).fill(0).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <>
      <div className="movie-list">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1
          return (
            <div
              key={movie.imdbID}
              ref={isLast ? lastElementRef : null}
            >
              <MovieCard movie={movie} />
            </div>
          )
        })}
      </div>
      
      {loadingMore && (
        <div className="loading-more">
          <div className="loading-more-spinner"></div>
          <span>Loading more movies...</span>
        </div>
      )}
      
      {!hasMore && movies.length > 0 && (
        <div className="no-more-results">
          <span>🎬 That's all folks! No more movies to load.</span>
        </div>
      )}
    </>
  )
}

export default MovieList
