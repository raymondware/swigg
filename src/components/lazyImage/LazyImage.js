import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from '../skeleton'

const LazyImage = ({
  src,
  alt,
  width = '100%',
  height,
  aspectRatio = '16/9',
  className,
  style,
  skeletonProps = {}
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [shouldLoad, setShouldLoad] = React.useState(false)
  const imageRef = React.useRef(null)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
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

  if (!src) {
    return (
      <Skeleton
        width={width}
        height={height}
        style={{
          aspectRatio,
          ...skeletonProps.style
        }}
        borderRadius={style?.borderRadius || '8px'}
        {...skeletonProps}
      />
    )
  }

  const containerStyle = {
    position: 'relative',
    width,
    height,
    aspectRatio,
    overflow: 'hidden',
    borderRadius: style?.borderRadius || '8px',
    ...style
  }

  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'block'
  }

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: style?.borderRadius || '8px'
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
          borderRadius={style?.borderRadius || '8px'}
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

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  skeletonProps: PropTypes.object
}

LazyImage.displayName = 'LazyImage'

export default LazyImage
