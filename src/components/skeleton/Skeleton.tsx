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
  /** Number of instances to render */
  count?: number
}

export interface SkeletonTextProps {
  /** Number of text lines */
  lines?: number
  /** Gap between lines */
  gap?: string
  /** Width of the last line (percentage or px) */
  lastLineWidth?: string
  /** Line height */
  lineHeight?: string
  /** Additional class name */
  className?: string
}

export interface SkeletonAvatarProps {
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
  /** Show text lines next to avatar */
  withText?: boolean
  /** Additional class name */
  className?: string
}

export interface SkeletonCardProps {
  /** Show image area */
  hasImage?: boolean
  /** Image height */
  imageHeight?: string
  /** Number of text lines in body */
  lines?: number
  /** Show footer */
  hasFooter?: boolean
  /** Additional class name */
  className?: string
}

export interface SkeletonTableRowProps {
  /** Number of columns */
  columns?: number
  /** Row height */
  height?: string
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

const avatarSizes = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '64px'
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

const TextContainer = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$gap};
  width: 100%;
`

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const AvatarTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const CardFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
`

const TableRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`

/**
 * Base Skeleton component for loading placeholders.
 * Supports various shapes, sizes, and multiple instances.
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * <Skeleton width="48px" height="48px" circle />
 * <Skeleton count={3} width="100%" height="16px" margin="0 0 8px 0" />
 * ```
 */
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
  count = 1,
  ...props
}) => {
  const elements = Array.from({ length: count }, (_, index) => (
    <SkeletonBase
      key={index}
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
  ))

  return count === 1 ? elements[0] : <>{elements}</>
}

/**
 * Skeleton text lines for paragraph placeholders.
 * 
 * @example
 * ```tsx
 * <SkeletonText lines={3} lastLineWidth="60%" />
 * ```
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  gap = '0.5rem',
  lastLineWidth = '70%',
  lineHeight = '16px',
  className
}) => (
  <TextContainer $gap={gap} className={className}>
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        width={index === lines - 1 ? lastLineWidth : '100%'}
        height={lineHeight}
      />
    ))}
  </TextContainer>
)

/**
 * Skeleton avatar with optional text lines.
 * 
 * @example
 * ```tsx
 * <SkeletonAvatar size="lg" withText />
 * ```
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  withText = false,
  className
}) => {
  const avatarSize = avatarSizes[size as keyof typeof avatarSizes] || size

  if (!withText) {
    return <Skeleton width={avatarSize} height={avatarSize} circle className={className} />
  }

  return (
    <AvatarContainer className={className}>
      <Skeleton width={avatarSize} height={avatarSize} circle />
      <AvatarTextWrapper>
        <Skeleton width="120px" height="14px" />
        <Skeleton width="80px" height="12px" />
      </AvatarTextWrapper>
    </AvatarContainer>
  )
}

/**
 * Skeleton card with optional image, text lines, and footer.
 * 
 * @example
 * ```tsx
 * <SkeletonCard hasImage imageHeight="180px" lines={2} hasFooter />
 * ```
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasImage = true,
  imageHeight = '160px',
  lines = 3,
  hasFooter = false,
  className
}) => (
  <CardContainer className={className}>
    {hasImage && (
      <Skeleton width="100%" height={imageHeight} borderRadius="0" />
    )}
    <CardBody>
      <Skeleton width="70%" height="20px" />
      <SkeletonText lines={lines} lineHeight="14px" gap="0.5rem" />
    </CardBody>
    {hasFooter && (
      <CardFooter>
        <Skeleton width="80px" height="32px" borderRadius="6px" />
        <Skeleton width="80px" height="32px" borderRadius="6px" />
      </CardFooter>
    )}
  </CardContainer>
)

/**
 * Skeleton table row for data table loading states.
 * 
 * @example
 * ```tsx
 * <SkeletonTableRow columns={4} />
 * ```
 */
export const SkeletonTableRow: React.FC<SkeletonTableRowProps> = ({
  columns = 4,
  height = '16px',
  className
}) => (
  <TableRowContainer className={className}>
    {Array.from({ length: columns }, (_, index) => (
      <Skeleton
        key={index}
        width={index === 0 ? '40%' : '100%'}
        height={height}
        customStyles="flex: 1;"
      />
    ))}
  </TableRowContainer>
)

Skeleton.displayName = 'Skeleton'
SkeletonText.displayName = 'SkeletonText'
SkeletonAvatar.displayName = 'SkeletonAvatar'
SkeletonCard.displayName = 'SkeletonCard'
SkeletonTableRow.displayName = 'SkeletonTableRow'

export default Skeleton
