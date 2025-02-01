import React from 'react'
import styled from 'styled-components'

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

AutoGrid.displayName = 'AutoGrid';

// TODO: Prop type validation

export default AutoGrid
