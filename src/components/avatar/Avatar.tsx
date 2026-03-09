import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps {
  /** Image source URL */
  src?: string
  /** Alt text for image */
  alt?: string
  /** User name (for fallback initials) */
  name?: string
  /** Size variant */
  size?: AvatarSize
  /** Status indicator */
  status?: AvatarStatus
  /** Whether avatar is rounded square or circle */
  rounded?: boolean
  /** Additional class name */
  className?: string
  /** Custom fallback element */
  fallback?: React.ReactNode
  /** Click handler */
  onClick?: () => void
}

export interface AvatarGroupProps {
  /** Avatar elements */
  children: React.ReactNode
  /** Maximum avatars to show */
  max?: number
  /** Size for all avatars */
  size?: AvatarSize
  /** Spacing between avatars */
  spacing?: 'tight' | 'normal' | 'loose'
  /** Additional class name */
  className?: string
}

interface StyledAvatarProps {
  $size: AvatarSize
  $rounded: boolean
  $clickable: boolean
  $bgColor: string
}

interface StatusIndicatorProps {
  $status: AvatarStatus
  $size: AvatarSize
}

interface AvatarGroupStyledProps {
  $spacing: 'tight' | 'normal' | 'loose'
}

const sizeMap = {
  xs: { size: '24px', font: '10px', status: '6px' },
  sm: { size: '32px', font: '12px', status: '8px' },
  md: { size: '40px', font: '14px', status: '10px' },
  lg: { size: '48px', font: '16px', status: '12px' },
  xl: { size: '64px', font: '20px', status: '14px' }
}

const statusColors = {
  online: '#10b981',
  offline: '#6b7280',
  busy: '#ef4444',
  away: '#f59e0b'
}

// Generate consistent color from string
const stringToColor = (str: string): string => {
  const colors = [
    '#7162e8', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get initials from name
const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

const AvatarContainer = styled.div<StyledAvatarProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => sizeMap[props.$size].size};
  height: ${props => sizeMap[props.$size].size};
  font-size: ${props => sizeMap[props.$size].font};
  font-weight: 600;
  color: white;
  background: ${props => props.$bgColor};
  border-radius: ${props => props.$rounded ? '8px' : '50%'};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  
  ${props => props.$clickable && css`
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    &:focus-visible {
      outline: 2px solid #7162e8;
      outline-offset: 2px;
    }
  `}
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StatusIndicator = styled.span<StatusIndicatorProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${props => sizeMap[props.$size].status};
  height: ${props => sizeMap[props.$size].status};
  background: ${props => statusColors[props.$status]};
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`

const AvatarGroupStyled = styled.div<AvatarGroupStyledProps>`
  display: inline-flex;
  align-items: center;
  
  > * {
    border: 2px solid white;
    margin-left: ${props => {
      switch (props.$spacing) {
        case 'tight': return '-12px'
        case 'normal': return '-8px'
        case 'loose': return '-4px'
      }
    }};
    
    &:first-child {
      margin-left: 0;
    }
  }
`

const OverflowAvatar = styled.div<{ $size: AvatarSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => sizeMap[props.$size].size};
  height: ${props => sizeMap[props.$size].size};
  font-size: ${props => sizeMap[props.$size].font};
  font-weight: 600;
  color: #374151;
  background: #e5e7eb;
  border-radius: 50%;
  border: 2px solid white;
`

/**
 * Avatar component for displaying user profile images with fallback to initials.
 * Supports status indicators and multiple sizes.
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="User" size="lg" status="online" />
 * <Avatar name="John Doe" size="md" /> // Shows initials "JD"
 * <Avatar fallback={<UserIcon />} /> // Custom fallback
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  rounded = false,
  className,
  fallback,
  onClick
}) => {
  const [imgError, setImgError] = useState(false)
  const showFallback = !src || imgError
  const bgColor = name ? stringToColor(name) : '#9ca3af'

  return (
    <AvatarContainer
      className={className}
      $size={size}
      $rounded={rounded}
      $clickable={!!onClick}
      $bgColor={showFallback ? bgColor : 'transparent'}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {showFallback ? (
        fallback || (name ? getInitials(name) : '?')
      ) : (
        <AvatarImage 
          src={src} 
          alt={alt || name || 'Avatar'} 
          onError={() => setImgError(true)}
        />
      )}
      {status && <StatusIndicator $status={status} $size={size} />}
    </AvatarContainer>
  )
}

/**
 * Avatar group component for displaying multiple avatars with overlap effect.
 * 
 * @example
 * ```tsx
 * <AvatarGroup max={3} size="md">
 *   <Avatar src="/user1.jpg" name="User 1" />
 *   <Avatar src="/user2.jpg" name="User 2" />
 *   <Avatar src="/user3.jpg" name="User 3" />
 *   <Avatar name="User 4" />
 *   <Avatar name="User 5" />
 * </AvatarGroup>
 * // Shows 3 avatars + "+2" overflow indicator
 * ```
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = 'md',
  spacing = 'normal',
  className
}) => {
  const childArray = React.Children.toArray(children)
  const visibleAvatars = childArray.slice(0, max)
  const overflowCount = childArray.length - max

  return (
    <AvatarGroupStyled className={className} $spacing={spacing}>
      {visibleAvatars.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, {
            key: index,
            size
          })
        }
        return child
      })}
      {overflowCount > 0 && (
        <OverflowAvatar $size={size}>
          +{overflowCount}
        </OverflowAvatar>
      )}
    </AvatarGroupStyled>
  )
}

Avatar.displayName = 'Avatar'
AvatarGroup.displayName = 'AvatarGroup'

export default Avatar
