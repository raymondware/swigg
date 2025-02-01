import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || '1rem'};
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.error ? '#dc3545' : '#dee2e6'};
  border-radius: 0.25rem;
  background: ${props => props.checked ? '#7162e8' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => !props.disabled && '#7162e8'};
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

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 2.75rem;
`

const Checkbox = ({
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
      onChange({ target: { checked: !checked, name: props.name } })
    }
  }

  return (
    <div>
      <CheckboxWrapper marginBottom={marginBottom}>
        <HiddenCheckbox
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <StyledCheckbox
          checked={checked}
          error={error}
          disabled={disabled}
          customStyles={customStyles}
          onClick={handleChange}
          role="checkbox"
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
      </CheckboxWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyles: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  name: PropTypes.string
}

export default Checkbox
