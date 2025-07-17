import { useCallback } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { searchMovies, loadMoreMovies, clearMovies, clearError, getMovieDetails } from '../store/moviesSlice'

const useMovieSearch = () => {
  const dispatch = useAppDispatch()
  const { 
    movies, 
    loading, 
    loadingMore, 
    error, 
    searchTerm, 
    totalResults, 
    currentPage, 
    totalPages, 
    hasMore, 
    searchHistory, 
    selectedMovie 
  } = useAppSelector((state) => state.movies)

  const handleSearchMovies = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) return
    dispatch(searchMovies(searchTerm))
  }, [dispatch])

  const handleLoadMoreMovies = useCallback(async () => {
    if (hasMore && !loadingMore) {
      dispatch(loadMoreMovies())
    }
  }, [dispatch, hasMore, loadingMore])

  const handleGetMovieDetails = useCallback(async (imdbID) => {
    dispatch(getMovieDetails(imdbID))
  }, [dispatch])

  const clearResults = useCallback(() => {
    dispatch(clearMovies())
  }, [dispatch])

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    movies,
    loading,
    loadingMore,
    error,
    searchTerm,
    totalResults,
    currentPage,
    totalPages,
    hasMore,
    searchHistory,
    selectedMovie,
    searchMovies: handleSearchMovies,
    loadMoreMovies: handleLoadMoreMovies,
    getMovieDetails: handleGetMovieDetails,
    clearResults,
    clearError: clearErrorMessage
  }
}

export default useMovieSearch
