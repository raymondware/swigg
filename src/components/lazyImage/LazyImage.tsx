import React, { useState, useEffect, useRef, CSSProperties } from 'react'
import Skeleton, { SkeletonProps } from '../skeleton/Skeleton'

/** Props for the LazyImage component */
export interface LazyImageProps {
  /** Image source URL */
  src?: string
  /** Alt text for accessibility */
  alt?: string
  /** Width of the container */
  width?: string | number
  /** Height of the container */
  height?: string | number
  /** CSS aspect ratio (e.g., '16/9', '4/3', '1/1') */
  aspectRatio?: string
  /** Additional CSS class name */
  className?: string
  /** Inline styles */
  style?: CSSProperties
  /** Props to pass to the Skeleton component */
  skeletonProps?: Partial<SkeletonProps>
}

/**
 * LazyImage - A lazy-loading image component with skeleton placeholder
 *
 * Uses IntersectionObserver to defer loading until the image is near the viewport.
 * Shows a Skeleton placeholder while loading.
 *
 * @example
 * <LazyImage
 *   src="/photo.jpg"
 *   alt="A scenic mountain view"
 *   aspectRatio="16/9"
 * />
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  width = '100%',
  height,
  aspectRatio = '16/9',
  className,
  style,
  skeletonProps = {}
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Show skeleton placeholder if no src provided
  if (!src) {
    return (
      <Skeleton
        width={typeof width === 'number' ? `${width}px` : width}
        height={height ? (typeof height === 'number' ? `${height}px` : height) : undefined}
        style={{
          aspectRatio,
          ...skeletonProps.style
        }}
        borderRadius={style?.borderRadius?.toString() || '8px'}
        {...skeletonProps}
      />
    )
  }

  const borderRadius = style?.borderRadius?.toString() || '8px'

  const containerStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    aspectRatio,
    overflow: 'hidden',
    borderRadius,
    ...style
  }

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'block'
  }

  const imageStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius
  }

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={className}
      data-testid="lazy-image-container"
    >
      <div style={wrapperStyle}>
        <Skeleton
          width="100%"
          height="100%"
          borderRadius={borderRadius}
          {...skeletonProps}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...skeletonProps.style
          }}
        />
        {shouldLoad && (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            style={imageStyle}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            data-testid="lazy-image"
          />
        )}
      </div>
    </div>
  )
}

LazyImage.displayName = 'LazyImage'

export default LazyImage
