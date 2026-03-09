import React from 'react'
import styled, { keyframes, css } from 'styled-components'

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string
  /** Height of the skeleton */
  height?: string
  /** Border radius of the skeleton */
  borderRadius?: string
  /** Margin around the skeleton */
  margin?: string
  /** Base color of the skeleton */
  baseColor?: string
  /** Highlight color for the shimmer effect */
  highlightColor?: string
  /** Opacity of the skeleton */
  opacity?: number
  /** Whether the skeleton should be a circle */
  circle?: boolean
  /** Custom CSS styles */
  customStyles?: string
  /** Additional class name */
  className?: string
}

interface StyledSkeletonProps {
  $width: string
  $height: string
  $borderRadius: string
  $margin: string
  $baseColor: string
  $highlightColor: string
  $opacity: number
  $circle: boolean
  $customStyles: string
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonBase = styled.div<StyledSkeletonProps>`
  width: ${props => props.$width};
  height: ${props => props.$height};
  border-radius: ${props => props.$borderRadius};
  margin: ${props => props.$margin};
  display: inline-block;
  background: ${props => props.$baseColor};
  background: linear-gradient(
    to right,
    ${props => props.$baseColor} 8%,
    ${props => props.$highlightColor} 18%,
    ${props => props.$baseColor} 33%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.2s linear infinite;
  opacity: ${props => props.$opacity};

  ${props => props.$circle && css`
    border-radius: 50%;
  `}

  ${props => props.$customStyles}
`

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  margin = '0',
  baseColor = '#eeeeee',
  highlightColor = '#f5f5f5',
  opacity = 1,
  circle = false,
  customStyles = '',
  className,
  ...props
}) => {
  return (
    <SkeletonBase
      $width={width}
      $height={height}
      $borderRadius={circle ? '50%' : borderRadius}
      $margin={margin}
      $baseColor={baseColor}
      $highlightColor={highlightColor}
      $opacity={opacity}
      $circle={circle}
      $customStyles={customStyles}
      className={className}
      data-testid="skeleton"
      {...props}
    />
  )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
