import useMovieSearch from '../hooks/useMovieSearch'
import MovieImage from './MovieImage'

const MovieCard = ({ movie }) => {
  const { getMovieDetails } = useMovieSearch()

  const handleCardClick = () => {
    getMovieDetails(movie.imdbID)
  }

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <MovieImage
        src={movie.Poster}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-details">
          <span className="movie-year">{movie.Year}</span>
          <span className="movie-type">{movie.Type}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
