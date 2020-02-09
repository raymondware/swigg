import React from 'react'
import styled from 'styled-components'

const GridWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding || "25px"};
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    grid-auto-flow: row;
`

const Elm = styled.div`
  border-radius: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  
  &:nth-child(odd) {
    grid-row-start: span 3;
  }
  
  &:nth-child(even) {
    grid-row-start: span 2;
  }
`

const MasonryGrid = ({ items, padding }) => {
  return (
    <GridWrapper padding={padding}>
      { items.map((item, index) => {
        return (<Elm key={index} style={{ backgroundImage: `url(${item})` }} />)
      }) }
    </GridWrapper>
  )
}

export default MasonryGrid
