import React from 'react'
import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode
  /** Visual style variant */
  variant?: ButtonVariant
  /** Custom background color override */
  bgOverlay?: string
  /** Additional CSS styles */
  customStyles?: string
}

interface StyledButtonProps {
  $variant: ButtonVariant
  $bgOverlay?: string
  $customStyles?: string
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$bgOverlay || (props.$variant === 'secondary' ? 'rgba(113, 98, 232, 0.1)' : '#7162e8')};
  color: ${props => props.$variant === 'secondary' ? '#7162e8' : 'white'};
  border: ${props => props.$variant === 'secondary' ? '2px solid #7162e8' : 'none'};

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${props => props.$customStyles && css`${props.$customStyles}`}
`

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  bgOverlay,
  customStyles,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $bgOverlay={bgOverlay}
      $customStyles={customStyles}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
