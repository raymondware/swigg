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
  border: 2px solid ${props => props.error ? props.theme.colors.danger : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSizes.md};
  transition: all 0.2s ease;
  background: ${props => props.disabled ? props.theme.colors.gray[100] : 'white'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
  
  &:disabled {
    cursor: not-allowed;
  }

  ${props => props.customStyles}
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.gray[700]};
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-top: 0.25rem;
`

const Input = ({
  label,
  error,
  marginBottom,
  customStyles,
  ...props
}) => {
  return (
    <InputWrapper marginBottom={marginBottom}>
      {label && <Label error={error}>{label}</Label>}
      <StyledInput
        error={error}
        customStyles={customStyles}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string
}

export default Input 