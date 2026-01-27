import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

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

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const StyledSelect = styled.select`
  width: 100%;
  border: 2px solid ${props =>
    props.$error ? '#dc3545' : '#dee2e6'
  };
  transition: all 0.2s ease;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  appearance: none;
  cursor: pointer;
  
  /* Size variant */
  ${props => sizes[props.$size] || sizes.md}
  
  /* Custom arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23495057' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#7162e8'};
    box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.2);
  }
  
  &:disabled {
    cursor: not-allowed;
  }

  ${props => props.$customStyles}
`

const Label = styled.label`
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

const Select = ({
  label,
  error,
  helpText,
  options,
  size = 'md',
  required = false,
  showRequiredIndicator = true,
  placeholder,
  marginBottom,
  customStyles,
  ...props
}) => {
  const id = props.id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`
  const helpTextId = helpText ? `${id}-help` : undefined
  const errorId = error ? `${id}-error` : undefined
  
  const describedBy = [helpTextId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <SelectWrapper $marginBottom={marginBottom}>
      {label && (
        <Label htmlFor={id} $error={error} $size={size}>
          {label}
          {required && showRequiredIndicator && (
            <RequiredIndicator aria-hidden="true">*</RequiredIndicator>
          )}
        </Label>
      )}
      <StyledSelect
        id={id}
        $error={error}
        $size={size}
        $customStyles={customStyles}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {helpText && !error && (
        <HelpText id={helpTextId}>{helpText}</HelpText>
      )}
      {error && (
        <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>
      )}
    </SelectWrapper>
  )
}

Select.propTypes = {
  /** Label text */
  label: PropTypes.string,
  /** Error message */
  error: PropTypes.string,
  /** Help text shown below select */
  helpText: PropTypes.string,
  /** Options array */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Is field required */
  required: PropTypes.bool,
  /** Show asterisk for required fields */
  showRequiredIndicator: PropTypes.bool,
  /** Placeholder option text */
  placeholder: PropTypes.string,
  /** Bottom margin */
  marginBottom: PropTypes.string,
  /** Custom CSS styles */
  customStyles: PropTypes.string,
  /** Select id */
  id: PropTypes.string,
  /** Select name */
  name: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool
}

Select.defaultProps = {
  size: 'md',
  required: false,
  showRequiredIndicator: true
}

export default Select
