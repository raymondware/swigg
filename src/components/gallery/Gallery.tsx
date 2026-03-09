import React from 'react'
import styled from 'styled-components'

export interface GalleryItem {
  image: string
  clickCallback?: () => void
  [key: string]: unknown
}

export interface GalleryProps {
  /** Array of gallery items */
  items: GalleryItem[]
  /** Padding around the gallery */
  padding?: string
  /** Minimum column size */
  colSize?: string
  /** Background color */
  bg?: string
  /** Gap between items */
  spacing?: string
  /** Custom CSS styles */
  customStyles?: string
}

interface GridWrapperProps {
  $padding?: string
  $colSize?: string
  $bg?: string
  $spacing?: string
  $customStyles?: string
}

const GridWrapper = styled.div<GridWrapperProps>`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  background: ${props => props.$bg || 'transparent'};
  padding: ${props => props.$padding || '25px'};
  display: grid;
  grid-gap: ${props => props.$spacing || '15px'};
  grid-template-columns: repeat(auto-fill, minmax(${props => props.$colSize || '250px'}, 1fr));
  grid-auto-rows: minmax(250px, auto);
  grid-auto-flow: row;

  ${props => props.$customStyles || ''}
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

const Gallery: React.FC<GalleryProps> = ({ 
  items, 
  padding, 
  colSize, 
  bg, 
  spacing,
  customStyles 
}) => {
  return (
    <GridWrapper 
      $padding={padding} 
      $colSize={colSize} 
      $bg={bg} 
      $spacing={spacing}
      $customStyles={customStyles}
    >
      {items.map((item, index) => (
        <Elm 
          key={index} 
          style={{ 
            backgroundImage: `url(${item.image})`, 
            cursor: item.clickCallback ? 'pointer' : 'default' 
          }} 
          onClick={item.clickCallback}
          role={item.clickCallback ? 'button' : undefined}
          tabIndex={item.clickCallback ? 0 : undefined}
          onKeyDown={(e) => {
            if (item.clickCallback && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              item.clickCallback()
            }
          }}
        />
      ))}
    </GridWrapper>
  )
}

export default Gallery
