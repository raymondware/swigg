import React from 'react'
import styled, { css, keyframes } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode
  /** Visual style variant */
  variant?: ButtonVariant
  /** Size variant */
  size?: ButtonSize
  /** Show loading spinner */
  loading?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Icon element to show on left */
  iconLeft?: React.ReactNode
  /** Icon element to show on right */
  iconRight?: React.ReactNode
  /** Custom background color override */
  bgOverlay?: string
  /** Additional CSS styles */
  customStyles?: string
  /** Render as different element */
  as?: React.ElementType
}

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $loading: boolean
  $fullWidth: boolean
  $bgOverlay?: string
  $customStyles?: string
}

// Spinner animation for loading state
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

// Spinner component
const Spinner = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`

// Size variants
const sizes = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  `,
  md: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.375rem;
  `,
  lg: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
    border-radius: 0.5rem;
  `
}

// Variant styles
const variants = {
  primary: css`
    background: ${(props: { theme?: { colors?: { primary?: string; primaryHover?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: ${(props: { theme?: { colors?: { primaryHover?: string } } }) => 
        props.theme?.colors?.primaryHover || '#5a4dd1'};
    }
  `,
  secondary: css`
    background: ${(props: { theme?: { colors?: { secondary?: string } } }) => 
      props.theme?.colors?.secondary || 'rgba(113, 98, 232, 0.1)'};
    color: ${(props: { theme?: { colors?: { primary?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    border: 2px solid ${(props: { theme?: { colors?: { primary?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    
    &:hover:not(:disabled) {
      background: ${(props: { theme?: { colors?: { secondaryHover?: string } } }) => 
        props.theme?.colors?.secondaryHover || 'rgba(113, 98, 232, 0.2)'};
    }
  `,
  outline: css`
    background: transparent;
    color: ${(props: { theme?: { colors?: { primary?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    border: 2px solid currentColor;
    
    &:hover:not(:disabled) {
      background: ${(props: { theme?: { colors?: { primary?: string } } }) => 
        props.theme?.colors?.primary || '#7162e8'};
      color: white;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${(props: { theme?: { colors?: { primary?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    border: none;
    
    &:hover:not(:disabled) {
      background: rgba(113, 98, 232, 0.1);
    }
  `,
  link: css`
    background: transparent;
    color: ${(props: { theme?: { colors?: { primary?: string } } }) => 
      props.theme?.colors?.primary || '#7162e8'};
    border: none;
    padding-left: 0;
    padding-right: 0;
    text-decoration: underline;
    
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  `,
  destructive: css`
    background: ${(props: { theme?: { colors?: { error?: string } } }) => 
      props.theme?.colors?.error || '#dc2626'};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: ${(props: { theme?: { colors?: { errorHover?: string } } }) => 
        props.theme?.colors?.errorHover || '#b91c1c'};
    }
  `
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  
  /* Size */
  ${props => sizes[props.$size]}
  
  /* Variant */
  ${props => variants[props.$variant]}
  
  /* Full width */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Loading state */
  ${props => props.$loading && css`
    cursor: wait;
    pointer-events: none;
  `}

  /* Focus ring for accessibility */
  &:focus-visible {
    outline: 2px solid ${props => props.theme?.colors?.primary || '#7162e8'};
    outline-offset: 2px;
  }

  ${props => props.$customStyles && css`${props.$customStyles}`}
`

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  bgOverlay,
  customStyles,
  as,
  ...props
}) => {
  return (
    <StyledButton
      as={as}
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      $bgOverlay={bgOverlay}
      $customStyles={customStyles}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner aria-hidden="true" />}
      {!loading && iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </StyledButton>
  )
}

export default Button
