import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'

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
    background: ${props => props.theme?.colors?.primary || '#7162e8'};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme?.colors?.primaryHover || '#5a4dd1'};
    }
  `,
  secondary: css`
    background: ${props => props.theme?.colors?.secondary || 'rgba(113, 98, 232, 0.1)'};
    color: ${props => props.theme?.colors?.primary || '#7162e8'};
    border: 2px solid ${props => props.theme?.colors?.primary || '#7162e8'};
    
    &:hover:not(:disabled) {
      background: ${props => props.theme?.colors?.secondaryHover || 'rgba(113, 98, 232, 0.2)'};
    }
  `,
  outline: css`
    background: transparent;
    color: ${props => props.theme?.colors?.primary || '#7162e8'};
    border: 2px solid currentColor;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme?.colors?.primary || '#7162e8'};
      color: white;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${props => props.theme?.colors?.primary || '#7162e8'};
    border: none;
    
    &:hover:not(:disabled) {
      background: rgba(113, 98, 232, 0.1);
    }
  `,
  link: css`
    background: transparent;
    color: ${props => props.theme?.colors?.primary || '#7162e8'};
    border: none;
    padding-left: 0;
    padding-right: 0;
    text-decoration: underline;
    
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  `,
  destructive: css`
    background: ${props => props.theme?.colors?.error || '#dc2626'};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme?.colors?.errorHover || '#b91c1c'};
    }
  `
}

const StyledButton = styled.button`
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
  ${props => sizes[props.$size] || sizes.md}
  
  /* Variant */
  ${props => variants[props.$variant] || variants.primary}
  
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

  ${props => props.$customStyles}
`

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
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

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Visual variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive']),
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Show loading spinner */
  loading: PropTypes.bool,
  /** Disable button */
  disabled: PropTypes.bool,
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Icon element to show on left */
  iconLeft: PropTypes.node,
  /** Icon element to show on right */
  iconRight: PropTypes.node,
  /** Custom CSS styles */
  customStyles: PropTypes.string,
  /** Render as different element (e.g., 'a' for links) */
  as: PropTypes.elementType,
  /** Click handler */
  onClick: PropTypes.func,
  /** Button type */
  type: PropTypes.string
}

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
  type: 'button'
}

export default Button
