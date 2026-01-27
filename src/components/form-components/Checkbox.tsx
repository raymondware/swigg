import React from 'react'
import styled from 'styled-components'

export interface CheckboxProps {
  /** Label text displayed next to checkbox */
  label?: string
  /** Error message to display */
  error?: string
  /** Custom margin bottom */
  marginBottom?: string
  /** Custom CSS styles */
  customStyles?: string
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Change handler */
  onChange?: (event: { target: { checked: boolean; name?: string } }) => void
  /** Whether the checkbox is required */
  required?: boolean
  /** Name attribute for form submission */
  name?: string
}

interface StyledCheckboxWrapperProps {
  $marginBottom?: string
}

interface StyledCheckboxProps {
  $checked?: boolean
  $error?: string
  $disabled?: boolean
  $customStyles?: string
}

interface StyledLabelProps {
  $error?: string
  $disabled?: boolean
}

const CheckboxWrapper = styled.div<StyledCheckboxWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
  border-radius: 0.25rem;
  background: ${props => props.$checked ? '#7162e8' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => !props.$disabled && '#7162e8'};
  }

  ${props => props.$customStyles}
`

const CheckIcon = styled.svg`
  width: 12px;
  height: 12px;
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`

const Label = styled.label<StyledLabelProps>`
  margin-left: 0.75rem;
  font-size: 1rem;
  color: ${props => props.$error ? '#dc3545' : '#495057'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 2.75rem;
`

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  marginBottom,
  customStyles,
  checked = false,
  disabled = false,
  onChange,
  name,
  ...props
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange({ target: { checked: !checked, name } })
    }
  }

  return (
    <div>
      <CheckboxWrapper $marginBottom={marginBottom}>
        <HiddenCheckbox
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        <StyledCheckbox
          $checked={checked}
          $error={error}
          $disabled={disabled}
          $customStyles={customStyles}
          onClick={handleChange}
          role="checkbox"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              handleChange()
            }
          }}
        >
          {checked && (
            <CheckIcon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </CheckIcon>
          )}
        </StyledCheckbox>
        {label && (
          <Label
            $error={error}
            $disabled={disabled}
            onClick={handleChange}
          >
            {label}
          </Label>
        )}
      </CheckboxWrapper>
      {error && (
        <ErrorMessage id={`${name}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}
    </div>
  )
}

export default Checkbox
