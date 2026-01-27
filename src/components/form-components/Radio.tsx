import React from 'react'
import styled from 'styled-components'

export interface RadioProps {
  /** Label text displayed next to radio */
  label?: string
  /** Error message to display */
  error?: string
  /** Custom margin bottom */
  marginBottom?: string
  /** Custom CSS styles */
  customStyles?: string
  /** Whether the radio is checked */
  checked?: boolean
  /** Whether the radio is disabled */
  disabled?: boolean
  /** Change handler */
  onChange?: (event: { target: { checked: boolean; name: string; value: string } }) => void
  /** Name attribute for form submission (required for radio groups) */
  name: string
  /** Value of this radio option (required) */
  value: string
  /** Whether the radio is required */
  required?: boolean
}

interface StyledRadioWrapperProps {
  $marginBottom?: string
}

interface StyledRadioProps {
  $checked?: boolean
  $error?: string
  $disabled?: boolean
  $customStyles?: string
}

interface StyledLabelProps {
  $error?: string
  $disabled?: boolean
}

const RadioWrapper = styled.div<StyledRadioWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const StyledRadio = styled.div<StyledRadioProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};

  &:hover {
    border-color: ${props => !props.$disabled && '#7162e8'};
  }

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #7162e8;
    opacity: ${props => props.$checked ? 1 : 0};
    transform: scale(${props => props.$checked ? 1 : 0});
    transition: all 0.2s ease;
  }

  ${props => props.$customStyles}
`

const Label = styled.label<StyledLabelProps>`
  margin-left: 0.75rem;
  font-size: 1rem;
  color: ${props => props.$error ? '#dc3545' : '#495057'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
`

const Radio: React.FC<RadioProps> = ({
  label,
  error,
  marginBottom,
  customStyles,
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  ...props
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange({ target: { checked: !checked, name, value } })
    }
  }

  return (
    <RadioWrapper $marginBottom={marginBottom}>
      <HiddenRadio
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        value={value}
        {...props}
      />
      <StyledRadio
        $checked={checked}
        $error={error}
        $disabled={disabled}
        $customStyles={customStyles}
        onClick={handleChange}
        role="radio"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            handleChange()
          }
        }}
      />
      {label && (
        <Label
          $error={error}
          $disabled={disabled}
          onClick={handleChange}
        >
          {label}
        </Label>
      )}
    </RadioWrapper>
  )
}

export default Radio
