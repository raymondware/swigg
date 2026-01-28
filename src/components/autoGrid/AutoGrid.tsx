import React from 'react'
import styled from 'styled-components'

export interface AutoGridProps {
  /** Grid items */
  children: React.ReactNode
  /** Padding around the grid */
  padding?: string
  /** Gap between grid items */
  spacing?: string
  /** Background color */
  bg?: string
  /** Minimum width of each item before wrapping */
  minWidth?: string
  /** Custom CSS styles */
  customStyles?: string
  /** Additional CSS class */
  className?: string
}

interface GridAreaProps {
  $padding?: string
  $spacing?: string
  $bg?: string
  $minWidth?: string
  $customStyles?: string
}

const GridArea = styled.div<GridAreaProps>`
  padding: ${props => props.$padding || '25px'};
  display: grid;
  grid-gap: ${props => props.$spacing || '25px'};
  background: ${props => props.$bg || 'white'};
  grid-template-columns: repeat(auto-fit, minmax(${props => props.$minWidth || '350px'}, 1fr));

  @media screen and (max-width: ${props => props.$minWidth || '350px'}) {
    grid-template-columns: 100%;
  }

  ${props => props.$customStyles || ''}
`

const AutoGrid: React.FC<AutoGridProps> = ({
  children,
  padding,
  spacing,
  bg,
  minWidth,
  customStyles,
  className
}) => {
  return (
    <GridArea
      $padding={padding}
      $spacing={spacing}
      $bg={bg}
      $minWidth={minWidth}
      $customStyles={customStyles}
      className={className}
    >
      {children}
    </GridArea>
  )
}

AutoGrid.displayName = 'AutoGrid'

export default AutoGrid
