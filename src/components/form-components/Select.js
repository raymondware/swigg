import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.marginBottom || '1rem'};
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props =>
    props.error ? '#dc3545' : '#dee2e6'
  };
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

  ${props => props.customStyles}
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.error ? '#dc3545' : '#495057'};
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const Select = ({
  label,
  error,
  options,
  marginBottom,
  customStyles,
  ...props
}) => {
  return (
    <SelectWrapper marginBottom={marginBottom}>
      {label && <Label error={error}>{label}</Label>}
      <StyledSelect
        error={error}
        customStyles={customStyles}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectWrapper>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool
}

export default Select
