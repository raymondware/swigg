import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${props => props.marginBottom || '1rem'};
`

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: ${props => props.minHeight || '100px'};
  padding: 0.75rem 1rem;
  border: 2px solid ${props =>
    props.error ? '#dc3545' : '#dee2e6'
  };
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.2s ease;
  resize: ${props => props.resize || 'vertical'};
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

const Textarea = ({
  label,
  error,
  marginBottom,
  customStyles,
  minHeight,
  resize,
  ...props
}) => {
  return (
    <TextareaWrapper marginBottom={marginBottom}>
      {label && <Label error={error}>{label}</Label>}
      <StyledTextarea
        error={error}
        customStyles={customStyles}
        minHeight={minHeight}
        resize={resize}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextareaWrapper>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  minHeight: PropTypes.string,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string
}

export default Textarea
