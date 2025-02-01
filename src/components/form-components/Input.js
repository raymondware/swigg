import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.marginBottom || '1rem'};
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props =>
    props.error ? '#dc3545' : '#dee2e6'
  };
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  
  &:focus {
    outline: none;
    border-color: #7162e8;
    box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.2);
  }
  
  &::placeholder {
    color: #ced4da;
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

const Input = ({
  label,
  error,
  marginBottom,
  customStyles,
  ...props
}) => {
  const id = props.id || props.name || Math.random().toString(36).substr(2, 9)

  return (
    <div>
      <InputWrapper marginBottom={marginBottom}>
        {label && (
          <Label htmlFor={id} error={error}>
            {label}
          </Label>
        )}
        <StyledInput
          id={id}
          error={error}
          customStyles={customStyles}
          {...props}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string
}

export default Input
