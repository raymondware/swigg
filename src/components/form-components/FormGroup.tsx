import React from 'react'
import styled from 'styled-components'

export interface FormGroupProps {
  /** Legend/title for the form group */
  legend?: string
  /** Error message to display */
  error?: string
  /** Custom margin bottom */
  marginBottom?: string
  /** Form group contents (typically radio buttons or checkboxes) */
  children: React.ReactNode
  /** Custom CSS styles */
  customStyles?: string
  /** ID for accessibility linking */
  id?: string
}

interface StyledGroupWrapperProps {
  $marginBottom?: string
  $customStyles?: string
}

interface StyledLegendProps {
  $error?: string
}

const GroupWrapper = styled.fieldset<StyledGroupWrapperProps>`
  margin-bottom: ${props => props.$marginBottom || '1.5rem'};
  border: none;
  padding: 0;
  ${props => props.$customStyles}
`

const Legend = styled.legend<StyledLegendProps>`
  font-weight: 500;
  color: ${props => props.$error ? '#dc3545' : '#495057'};
  margin-bottom: 0.75rem;
  padding: 0;
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const FormGroup: React.FC<FormGroupProps> = ({
  legend,
  error,
  marginBottom,
  children,
  customStyles,
  id
}) => {
  const errorId = id ? `${id}-error` : undefined

  return (
    <GroupWrapper
      $marginBottom={marginBottom}
      $customStyles={customStyles}
      aria-describedby={error && errorId ? errorId : undefined}
      aria-invalid={error ? true : undefined}
    >
      {legend && <Legend $error={error}>{legend}</Legend>}
      {children}
      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </GroupWrapper>
  )
}

export default FormGroup
