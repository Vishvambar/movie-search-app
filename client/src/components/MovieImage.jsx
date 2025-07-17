import { useState } from 'react'

const MovieImage = ({ src, alt, className, fallbackSrc = null }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  // Check if the source is valid
  const isValidSrc = src && src !== 'N/A' && src !== '' && !imageError

  return (
    <div className={`movie-image-container ${className}`}>
      {imageLoading && isValidSrc && (
        <div className="image-loading">
          <div className="image-spinner"></div>
        </div>
      )}
      
      {isValidSrc ? (
        <img
          src={src}
          alt={alt}
          className={`movie-image ${imageLoading ? 'loading' : ''}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      ) : (
        <div className="movie-placeholder">
          <div className="placeholder-icon">🎬</div>
          <div className="placeholder-text">
            <div className="placeholder-title">No Image</div>
            <div className="placeholder-subtitle">Available</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieImage
