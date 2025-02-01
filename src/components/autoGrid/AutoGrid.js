import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const GridArea = styled.div`
    padding: ${props => props.padding || '25px'};
    display: grid;
    grid-gap: ${props => props.spacing || '25px'};
    background: ${props => props.bg || 'white'};
    grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '350px'}, 1fr));

    @media screen and (max-width: ${props => props.minWidth || '350px'}) {
      grid-template-columns: 100%;
    }

    ${props => props?.customStyles ? props.customStyles : ''}
`

const AutoGrid = props => {
  return (
    <GridArea {...props}>
      {props.children}
    </GridArea>
  )
}

AutoGrid.displayName = 'AutoGrid'

AutoGrid.propTypes = {
  children: PropTypes.node.isRequired
  // ... other prop types
}

// TODO: Prop type validation

export default AutoGrid
