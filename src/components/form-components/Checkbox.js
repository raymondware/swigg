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
  border: 2px solid ${props => props.error ? props.theme.colors.danger : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.checked ? props.theme.colors.primary : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => !props.disabled && props.theme.colors.primary};
  }

  ${props => props.customStyles}
`

const Label = styled.label`
  margin-left: 0.75rem;
  font-size: ${props => props.theme.typography.fontSizes.md};
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.gray[700]};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.sm};
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
  const handleChange = (e) => {
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