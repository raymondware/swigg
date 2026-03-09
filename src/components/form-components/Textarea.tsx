import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label text displayed above the textarea */
  label?: string
  /** Error message to display */
  error?: string
  /** Help text shown below textarea */
  helpText?: string
  /** Size variant */
  size?: TextareaSize
  /** Show asterisk for required fields */
  showRequiredIndicator?: boolean
  /** Bottom margin spacing */
  marginBottom?: string
  /** Additional CSS styles */
  customStyles?: string
  /** Minimum height of the textarea */
  minHeight?: string
  /** Resize behavior */
  resize?: TextareaResize
  /** Show character count */
  showCharacterCount?: boolean
  /** Auto-resize to fit content */
  autoResize?: boolean
}

interface StyledTextareaWrapperProps {
  $marginBottom?: string
}

interface StyledTextareaProps {
  $error?: boolean
  $size: TextareaSize
  $customStyles?: string
  $minHeight?: string
  $resize?: TextareaResize
}

interface StyledLabelProps {
  $error?: boolean
  $size: TextareaSize
}

interface CharacterCountProps {
  $isOver?: boolean
}

// Size variants
const sizes = {
  sm: css`
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    min-height: 80px;
  `,
  md: css`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 0.375rem;
    min-height: 100px;
  `,
  lg: css`
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
    border-radius: 0.5rem;
    min-height: 140px;
  `
}

const TextareaWrapper = styled.div<StyledTextareaWrapperProps>`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  border: 2px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.2s ease;
  resize: ${props => props.$resize || 'vertical'};
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  
  /* Size variant */
  ${props => sizes[props.$size]}
  
  /* Custom min-height override */
  ${props => props.$minHeight && css`
    min-height: ${props.$minHeight};
  `}
  
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

const CharacterCount = styled.div<CharacterCountProps>`
  color: ${props => props.$isOver ? '#dc3545' : '#6c757d'};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  text-align: right;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helpText,
  size = 'md',
  required = false,
  showRequiredIndicator = true,
  marginBottom,
  customStyles,
  minHeight,
  resize = 'vertical',
  maxLength,
  showCharacterCount = false,
  autoResize = false,
  value,
  defaultValue,
  onChange,
  id,
  name,
  ...props
}) => {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`
  const helpTextId = helpText ? `${textareaId}-help` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Track character count for controlled and uncontrolled components
  const [charCount, setCharCount] = useState(
    ((value as string) || (defaultValue as string) || '').length
  )
  
  // Combine aria-describedby values
  const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined
  
  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value, autoResize])
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
    
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
    
    if (onChange) {
      onChange(e)
    }
  }
  
  const isOverLimit = maxLength !== undefined && charCount > maxLength
  const showFooter = (helpText && !error) || error || showCharacterCount

  return (
    <TextareaWrapper $marginBottom={marginBottom}>
      {label && (
        <Label htmlFor={textareaId} $error={!!error} $size={size}>
          {label}
          {required && showRequiredIndicator && (
            <RequiredIndicator aria-hidden="true">*</RequiredIndicator>
          )}
        </Label>
      )}
      <StyledTextarea
        ref={textareaRef}
        id={textareaId}
        name={name}
        $error={!!error}
        $size={size}
        $customStyles={customStyles}
        $minHeight={minHeight}
        $resize={autoResize ? 'none' : resize}
        required={required}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {showFooter && (
        <Footer>
          <div>
            {helpText && !error && (
              <HelpText id={helpTextId}>{helpText}</HelpText>
            )}
            {error && (
              <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>
            )}
          </div>
          {showCharacterCount && (
            <CharacterCount $isOver={isOverLimit}>
              {charCount}{maxLength ? `/${maxLength}` : ''}
            </CharacterCount>
          )}
        </Footer>
      )}
    </TextareaWrapper>
  )
}

export default Textarea
