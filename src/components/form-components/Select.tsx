import React from 'react'
import styled, { css } from 'styled-components'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text displayed above the select */
  label?: string
  /** Error message to display */
  error?: string
  /** Array of options */
  options: SelectOption[]
  /** Bottom margin spacing */
  marginBottom?: string
  /** Additional CSS styles */
  customStyles?: string
}

interface StyledSelectWrapperProps {
  $marginBottom?: string
}

interface StyledSelectProps {
  $error?: boolean
  $customStyles?: string
}

interface StyledLabelProps {
  $error?: boolean
}

const SelectWrapper = styled.div<StyledSelectWrapperProps>`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const StyledSelect = styled.select<StyledSelectProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #7162e8;
    box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.2);
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
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  marginBottom,
  customStyles,
  ...props
}) => {
  return (
    <SelectWrapper $marginBottom={marginBottom}>
      {label && <Label $error={!!error}>{label}</Label>}
      <StyledSelect
        $error={!!error}
        $customStyles={customStyles}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </SelectWrapper>
  )
}

export default Select
