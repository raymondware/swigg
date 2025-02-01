import { useEffect, useState, useCallback } from 'react'

// https://usehooks.com/useWindowSize/
const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    getSize() // Initial size

    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, getSize])

  return windowSize
}

export default useWindowSize
