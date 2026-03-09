import React from 'react'
import styled, { css } from 'styled-components'

export type BadgeVariant = 'solid' | 'outline' | 'subtle'
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'gray'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode
  /** Visual variant */
  variant?: BadgeVariant
  /** Color scheme */
  color?: BadgeColor
  /** Size variant */
  size?: BadgeSize
  /** Show dot indicator instead of content */
  dot?: boolean
  /** Additional class name */
  className?: string
}

export interface TagProps extends Omit<BadgeProps, 'dot'> {
  /** Show close button */
  dismissible?: boolean
  /** Close callback */
  onClose?: () => void
  /** Icon element */
  icon?: React.ReactNode
}

interface StyledBadgeProps {
  $variant: BadgeVariant
  $color: BadgeColor
  $size: BadgeSize
  $dot: boolean
}

interface StyledTagProps extends StyledBadgeProps {
  $dismissible: boolean
}

const colorSchemes = {
  primary: {
    solid: { bg: '#7162e8', color: 'white', border: '#7162e8' },
    outline: { bg: 'transparent', color: '#7162e8', border: '#7162e8' },
    subtle: { bg: 'rgba(113, 98, 232, 0.1)', color: '#7162e8', border: 'transparent' }
  },
  success: {
    solid: { bg: '#10b981', color: 'white', border: '#10b981' },
    outline: { bg: 'transparent', color: '#059669', border: '#10b981' },
    subtle: { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669', border: 'transparent' }
  },
  warning: {
    solid: { bg: '#f59e0b', color: 'white', border: '#f59e0b' },
    outline: { bg: 'transparent', color: '#d97706', border: '#f59e0b' },
    subtle: { bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: 'transparent' }
  },
  error: {
    solid: { bg: '#ef4444', color: 'white', border: '#ef4444' },
    outline: { bg: 'transparent', color: '#dc2626', border: '#ef4444' },
    subtle: { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'transparent' }
  },
  gray: {
    solid: { bg: '#6b7280', color: 'white', border: '#6b7280' },
    outline: { bg: 'transparent', color: '#4b5563', border: '#6b7280' },
    subtle: { bg: '#f3f4f6', color: '#4b5563', border: 'transparent' }
  }
}

const sizeStyles = {
  sm: css`
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  `,
  md: css`
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
  `,
  lg: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `
}

const dotSizes = {
  sm: css`
    width: 6px;
    height: 6px;
  `,
  md: css`
    width: 8px;
    height: 8px;
  `,
  lg: css`
    width: 10px;
    height: 10px;
  `
}

const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  line-height: 1.4;
  
  ${props => {
    const colors = colorSchemes[props.$color][props.$variant]
    return css`
      background: ${colors.bg};
      color: ${colors.color};
      border: 1px solid ${colors.border};
    `
  }}
  
  ${props => props.$dot ? css`
    padding: 0;
    border-radius: 50%;
    ${dotSizes[props.$size]}
  ` : sizeStyles[props.$size]}
`

const StyledTag = styled.span<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  line-height: 1.4;
  
  ${props => {
    const colors = colorSchemes[props.$color][props.$variant]
    return css`
      background: ${colors.bg};
      color: ${colors.color};
      border: 1px solid ${colors.border};
    `
  }}
  
  ${props => sizeStyles[props.$size]}
  
  ${props => props.$dismissible && css`
    padding-right: 0.375rem;
  `}
`

const TagIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1em;
`

const CloseButton = styled.button<{ $color: BadgeColor }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.125rem;
  margin-left: 0.125rem;
  cursor: pointer;
  border-radius: 4px;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.15s ease, background 0.15s ease;
  font-size: 1em;
  line-height: 1;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
`

/**
 * Badge component for status indicators, counts, or labels.
 * Supports solid, outline, and subtle variants with multiple colors.
 * 
 * @example
 * ```tsx
 * <Badge color="success" variant="subtle">Active</Badge>
 * <Badge color="error" dot /> // Dot indicator
 * <Badge color="primary" size="lg">Premium</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  color = 'primary',
  size = 'md',
  dot = false,
  className
}) => (
  <StyledBadge
    className={className}
    $variant={variant}
    $color={color}
    $size={size}
    $dot={dot}
    aria-label={dot ? `${color} status indicator` : undefined}
  >
    {!dot && children}
  </StyledBadge>
)

/**
 * Tag component for dismissible labels and categories.
 * Extends Badge with close button and icon support.
 * 
 * @example
 * ```tsx
 * <Tag color="primary" dismissible onClose={() => removeTag()}>
 *   React
 * </Tag>
 * <Tag color="gray" icon={<FolderIcon />}>
 *   Category
 * </Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'subtle',
  color = 'gray',
  size = 'md',
  dismissible = false,
  onClose,
  icon,
  className
}) => (
  <StyledTag
    className={className}
    $variant={variant}
    $color={color}
    $size={size}
    $dot={false}
    $dismissible={dismissible}
  >
    {icon && <TagIcon>{icon}</TagIcon>}
    {children}
    {dismissible && (
      <CloseButton 
        onClick={onClose} 
        $color={color}
        aria-label="Remove"
        type="button"
      >
        ×
      </CloseButton>
    )}
  </StyledTag>
)

Badge.displayName = 'Badge'
Tag.displayName = 'Tag'

export default Badge
