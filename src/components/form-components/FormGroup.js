import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const GroupWrapper = styled.div`
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
  ${props => props.customStyles}
`

const Legend = styled.div`
  font-weight: 500;
  color: ${props => props.error ? '#dc3545' : '#495057'};
  margin-bottom: 0.75rem;
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const FormGroup = ({
  legend,
  error,
  marginBottom,
  children,
  customStyles
}) => {
  return (
    <GroupWrapper marginBottom={marginBottom} customStyles={customStyles}>
      {legend && <Legend error={error}>{legend}</Legend>}
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </GroupWrapper>
  )
}

FormGroup.propTypes = {
  legend: PropTypes.string,
  error: PropTypes.string,
  marginBottom: PropTypes.string,
  children: PropTypes.node.isRequired,
  customStyles: PropTypes.string
}

export default FormGroup
