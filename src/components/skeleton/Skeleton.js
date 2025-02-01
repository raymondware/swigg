import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonBase = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius};
  margin: ${props => props.margin};
  display: inline-block;
  background: ${props => props.baseColor};
  background: linear-gradient(
    to right,
    ${props => props.baseColor} 8%,
    ${props => props.highlightColor} 18%,
    ${props => props.baseColor} 33%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.2s linear infinite;
  opacity: ${props => props.opacity};

  ${props => props.circle && `
    border-radius: 50%;
  `}

  ${props => props.customStyles}
`

const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  margin = '0',
  baseColor = '#eeeeee',
  highlightColor = '#f5f5f5',
  opacity = 1,
  circle = false,
  customStyles = '',
  ...props
}) => {
  return (
    <SkeletonBase
      width={width}
      height={height}
      borderRadius={circle ? '50%' : borderRadius}
      margin={margin}
      baseColor={baseColor}
      highlightColor={highlightColor}
      opacity={opacity}
      circle={circle}
      customStyles={customStyles}
      data-testid="skeleton"
      {...props}
    />
  )
}

Skeleton.propTypes = {
  /** Width of the skeleton */
  width: PropTypes.string,
  /** Height of the skeleton */
  height: PropTypes.string,
  /** Border radius of the skeleton */
  borderRadius: PropTypes.string,
  /** Margin around the skeleton */
  margin: PropTypes.string,
  /** Base color of the skeleton */
  baseColor: PropTypes.string,
  /** Highlight color for the shimmer effect */
  highlightColor: PropTypes.string,
  /** Opacity of the skeleton */
  opacity: PropTypes.number,
  /** Whether the skeleton should be a circle */
  circle: PropTypes.bool,
  /** Custom CSS styles */
  customStyles: PropTypes.string
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
