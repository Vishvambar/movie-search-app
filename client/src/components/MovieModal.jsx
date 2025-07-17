import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearSelectedMovie } from '../store/moviesSlice'
import MovieImage from './MovieImage'

const MovieModal = ({ movie, onClose }) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(clearSelectedMovie())
    onClose()
  }

  if (!movie) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        <div className="modal-movie-details">
          <MovieImage
            src={movie.Poster}
            alt={movie.Title}
            className="modal-poster"
          />
          <div className="modal-info">
            <h2 className="modal-title">{movie.Title}</h2>
            <div className="modal-meta">
              <span className="modal-year">{movie.Year}</span>
              <span className="modal-runtime">{movie.Runtime}</span>
              <span className="modal-genre">{movie.Genre}</span>
            </div>
            <div className="modal-rating">
              <span className="imdb-rating">⭐ {movie.imdbRating}/10</span>
              <span className="rated">{movie.Rated}</span>
            </div>
            <p className="modal-plot">{movie.Plot}</p>
            <div className="modal-details">
              <div className="detail-item">
                <strong>Director:</strong> {movie.Director}
              </div>
              <div className="detail-item">
                <strong>Cast:</strong> {movie.Actors}
              </div>
              <div className="detail-item">
                <strong>Country:</strong> {movie.Country}
              </div>
              <div className="detail-item">
                <strong>Language:</strong> {movie.Language}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
