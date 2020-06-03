import React from 'react'
import styled from 'styled-components'

const GridWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    background: ${props => props.bg || 'transparent'};
    padding: ${props => props.padding || "25px"};
    display: grid;
    grid-gap: ${props => props.spacing || '15px'};
    grid-template-columns: repeat(auto-fill, minmax(${props => props.colSize || '250px'}, 1fr));
    grid-auto-rows: minmax(250px, auto);
    grid-auto-flow: row;
`

const Elm = styled.div`
  border-radius: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }
`

const Gallery = ({ items, padding, colSize, bg, spacing }) => {
  return (
    <GridWrapper padding={padding} colSize={colSize} bg={bg} spacing={spacing}>
      { items.map((item, index) => {
        return <Elm key={index} style={{ backgroundImage: `url(${item.image})`, cursor: item.clickCallback ? 'pointer' : 'mouse' }} onClick={item.clickCallback ? item.clickCallback : () => {}} />
      }) }
    </GridWrapper>
  )
}

export default Gallery
