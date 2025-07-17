import { useEffect, useCallback, useRef } from 'react'

const useInfiniteScroll = (callback, hasMore, loading) => {
  const observerRef = useRef(null)
  const loadingRef = useRef(false)

  const lastElementRef = useCallback(
    (node) => {
      if (loadingRef.current) return
      if (observerRef.current) observerRef.current.disconnect()
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadingRef.current = true
          callback().finally(() => {
            loadingRef.current = false
          })
        }
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      })
      
      if (node) observerRef.current.observe(node)
    },
    [callback, hasMore, loading]
  )

  useEffect(() => {
    loadingRef.current = loading
  }, [loading])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return lastElementRef
}

export default useInfiniteScroll
