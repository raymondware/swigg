import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RadioWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || '1rem'};
`

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const StyledRadio = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.error ? '#dc3545' : '#dee2e6'};
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => !props.disabled && '#7162e8'};
  }

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #7162e8;
    opacity: ${props => props.checked ? 1 : 0};
    transform: scale(${props => props.checked ? 1 : 0});
    transition: all 0.2s ease;
  }

  ${props => props.customStyles}
`

const Label = styled.label`
  margin-left: 0.75rem;
  font-size: 1rem;
  color: ${props => props.error ? '#dc3545' : '#495057'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`

const Radio = ({
  label,
  error,
  marginBottom,
  customStyles,
  checked = false,
  disabled = false,
  onChange,
  ...props
}) => {
  const handleChange = (_e) => {
    if (!disabled && onChange) {
      if (checked) {
        onChange({ target: { checked: false, name: props.name, value: props.value } })
      } else {
        onChange({ target: { checked: true, name: props.name, value: props.value } })
      }
    }
  }

  return (
    <RadioWrapper marginBottom={marginBottom}>
      <HiddenRadio
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <StyledRadio
        checked={checked}
        error={error}
        disabled={disabled}
        customStyles={customStyles}
        onClick={handleChange}
        role="radio"
        aria-checked={checked}
      />
      {label && (
        <Label
          error={error}
          disabled={disabled}
          onClick={handleChange}
        >
          {label}
        </Label>
      )}
    </RadioWrapper>
  )
}

Radio.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool
}

export default Radio
