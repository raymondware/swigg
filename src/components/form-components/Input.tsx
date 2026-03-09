import React from 'react'
import styled, { css } from 'styled-components'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: string
  /** Error message to display */
  error?: string
  /** Help text shown below input */
  helpText?: string
  /** Size variant */
  size?: InputSize
  /** Show asterisk for required fields */
  showRequiredIndicator?: boolean
  /** Bottom margin spacing */
  marginBottom?: string
  /** Additional CSS styles */
  customStyles?: string
}

interface StyledInputWrapperProps {
  $marginBottom?: string
}

interface StyledInputProps {
  $error?: boolean
  $size: InputSize
  $customStyles?: string
}

interface StyledLabelProps {
  $error?: boolean
  $size: InputSize
}

// Size variants
const sizes = {
  sm: css`
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  `,
  md: css`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 0.375rem;
  `,
  lg: css`
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
    border-radius: 0.5rem;
  `
}

const InputWrapper = styled.div<StyledInputWrapperProps>`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: 2px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
  transition: all 0.2s ease;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  
  /* Size variant */
  ${props => sizes[props.$size]}
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#7162e8'};
    box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.2);
  }
  
  &::placeholder {
    color: #ced4da;
  }
  
  &:disabled {
    cursor: not-allowed;
  }

  ${props => props.$customStyles && css`${props.$customStyles}`}
`

const Label = styled.label<StyledLabelProps>`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.$error ? '#dc3545' : '#495057'};
  font-size: ${props => props.$size === 'sm' ? '0.875rem' : props.$size === 'lg' ? '1.125rem' : '1rem'};
`

const RequiredIndicator = styled.span`
  color: #dc3545;
  margin-left: 0.25rem;
`

const HelpText = styled.div`
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  size = 'md',
  required = false,
  showRequiredIndicator = true,
  marginBottom,
  customStyles,
  id,
  name,
  ...props
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`
  const helpTextId = helpText ? `${inputId}-help` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  
  // Combine aria-describedby values
  const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <InputWrapper $marginBottom={marginBottom}>
      {label && (
        <Label htmlFor={inputId} $error={!!error} $size={size}>
          {label}
          {required && showRequiredIndicator && (
            <RequiredIndicator aria-hidden="true">*</RequiredIndicator>
          )}
        </Label>
      )}
      <StyledInput
        id={inputId}
        name={name}
        $error={!!error}
        $size={size}
        $customStyles={customStyles}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {helpText && !error && (
        <HelpText id={helpTextId}>{helpText}</HelpText>
      )}
      {error && (
        <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>
      )}
    </InputWrapper>
  )
}

export default Input
