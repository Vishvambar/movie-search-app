const MovieSkeleton = () => {
  return (
    <div className="movie-card movie-skeleton">
      <div className="movie-image-container movie-poster">
        <div className="skeleton-poster"></div>
      </div>
      <div className="movie-info">
        <div className="skeleton-title"></div>
        <div className="movie-details">
          <div className="skeleton-year"></div>
          <div className="skeleton-type"></div>
        </div>
      </div>
    </div>
  )
}

export default MovieSkeleton
