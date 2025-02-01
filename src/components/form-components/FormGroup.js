import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const GroupWrapper = styled.div`
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
`

const Legend = styled.div`
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.gray[700]};
  margin-bottom: 0.75rem;
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.sm};
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
    <GroupWrapper marginBottom={marginBottom} style={customStyles}>
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
  customStyles: PropTypes.object
}

export default FormGroup 