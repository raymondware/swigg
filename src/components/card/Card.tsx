import React from 'react'
import styled, { css } from 'styled-components'

export type CardVariant = 'elevated' | 'outlined' | 'flat'
export type CardImagePosition = 'top' | 'left' | 'right'

export interface CardProps {
  /** Card content */
  children: React.ReactNode
  /** Visual variant */
  variant?: CardVariant
  /** Whether the card is clickable */
  clickable?: boolean
  /** Click handler (makes card clickable) */
  onClick?: () => void
  /** Additional class name */
  className?: string
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Full width */
  fullWidth?: boolean
  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg'
  /** Custom styles */
  customStyles?: string
}

export interface CardHeaderProps {
  children: React.ReactNode
  /** Optional action elements (right side) */
  action?: React.ReactNode
  className?: string
}

export interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export interface CardFooterProps {
  children: React.ReactNode
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between'
  className?: string
}

export interface CardImageProps {
  /** Image source */
  src: string
  /** Alt text */
  alt: string
  /** Image height */
  height?: string
  /** Image position */
  position?: CardImagePosition
  /** Object fit */
  fit?: 'cover' | 'contain' | 'fill'
  className?: string
}

interface StyledCardProps {
  $variant: CardVariant
  $clickable: boolean
  $padding: 'none' | 'sm' | 'md' | 'lg'
  $fullWidth: boolean
  $radius: 'none' | 'sm' | 'md' | 'lg'
  $customStyles?: string
}

interface StyledFooterProps {
  $align: 'left' | 'center' | 'right' | 'between'
}

interface StyledImageProps {
  $height: string
  $position: CardImagePosition
  $fit: 'cover' | 'contain' | 'fill'
}

const variantStyles = {
  elevated: css`
    background: white;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `,
  outlined: css`
    background: white;
    border: 1px solid #e5e7eb;
    box-shadow: none;
    
    &:hover {
      border-color: #d1d5db;
    }
  `,
  flat: css`
    background: #f9fafb;
    border: none;
    box-shadow: none;
    
    &:hover {
      background: #f3f4f6;
    }
  `
}

const paddingStyles = {
  none: css`padding: 0;`,
  sm: css`padding: 0.75rem;`,
  md: css`padding: 1rem;`,
  lg: css`padding: 1.5rem;`
}

const radiusStyles = {
  none: css`border-radius: 0;`,
  sm: css`border-radius: 6px;`,
  md: css`border-radius: 12px;`,
  lg: css`border-radius: 16px;`
}

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => variantStyles[props.$variant]}
  ${props => radiusStyles[props.$radius]}
  
  /* Only apply padding if no image or specific sections */
  > *:not([data-card-image]):not([data-card-section]) {
    ${props => paddingStyles[props.$padding]}
  }
  
  ${props => props.$clickable && css`
    cursor: pointer;
    user-select: none;
    
    &:active {
      transform: scale(0.98);
    }
    
    &:focus-visible {
      outline: 2px solid #7162e8;
      outline-offset: 2px;
    }
  `}
  
  ${props => props.$customStyles}
`

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  
  h2, h3, h4 {
    margin: 0;
    font-weight: 600;
    color: #111827;
  }
`

const HeaderContent = styled.div`
  flex: 1;
`

const HeaderAction = styled.div`
  margin-left: 1rem;
  flex-shrink: 0;
`

const BodyStyled = styled.div`
  padding: 1.25rem;
  flex: 1;
`

const FooterStyled = styled.div<StyledFooterProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
  
  justify-content: ${props => {
    switch (props.$align) {
      case 'left': return 'flex-start'
      case 'center': return 'center'
      case 'right': return 'flex-end'
      case 'between': return 'space-between'
      default: return 'flex-start'
    }
  }};
`

const ImageStyled = styled.div<StyledImageProps>`
  overflow: hidden;
  flex-shrink: 0;
  
  ${props => props.$position === 'top' && css`
    width: 100%;
    height: ${props.$height};
  `}
  
  ${props => props.$position === 'left' && css`
    width: 40%;
    min-height: 100%;
  `}
  
  ${props => props.$position === 'right' && css`
    width: 40%;
    min-height: 100%;
  `}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.$fit};
    display: block;
  }
`

const HorizontalLayout = styled.div<{ $imagePosition: 'left' | 'right' }>`
  display: flex;
  flex-direction: ${props => props.$imagePosition === 'left' ? 'row' : 'row-reverse'};
  
  @media (max-width: 640px) {
    flex-direction: column;
    
    ${ImageStyled} {
      width: 100%;
      height: 200px;
    }
  }
`

/**
 * Card header section
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ children, action, className }) => (
  <HeaderStyled className={className} data-card-section>
    <HeaderContent>{children}</HeaderContent>
    {action && <HeaderAction>{action}</HeaderAction>}
  </HeaderStyled>
)

/**
 * Card body section
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <BodyStyled className={className} data-card-section>{children}</BodyStyled>
)

/**
 * Card footer section
 */
export const CardFooter: React.FC<CardFooterProps> = ({ children, className, align = 'left' }) => (
  <FooterStyled className={className} $align={align} data-card-section>{children}</FooterStyled>
)

/**
 * Card image component
 */
export const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  height = '200px', 
  position = 'top',
  fit = 'cover',
  className 
}) => (
  <ImageStyled 
    className={className} 
    $height={height} 
    $position={position} 
    $fit={fit}
    data-card-image
  >
    <img src={src} alt={alt} />
  </ImageStyled>
)

/**
 * Flexible Card component with header, body, footer sections and image support.
 * Supports multiple variants and can be made clickable.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" clickable onClick={handleClick}>
 *   <CardImage src="/image.jpg" alt="Card image" />
 *   <CardHeader action={<Button size="sm">Action</Button>}>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Card content goes here</p>
 *   </CardBody>
 *   <CardFooter align="right">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button>Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  clickable = false,
  onClick,
  className,
  padding = 'none',
  fullWidth = false,
  radius = 'md',
  customStyles
}) => {
  const isClickable = clickable || !!onClick

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <StyledCard
      className={className}
      $variant={variant}
      $clickable={isClickable}
      $padding={padding}
      $fullWidth={fullWidth}
      $radius={radius}
      $customStyles={customStyles}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
    >
      {children}
    </StyledCard>
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'
CardImage.displayName = 'CardImage'

export default Card
