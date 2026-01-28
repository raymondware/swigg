import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Skeleton from '../skeleton'

export interface MasonryItem {
  image: string
  alt?: string
  aspectRatio?: string
  contentPadding?: string
  [key: string]: unknown
}

export interface MasonryGridProps {
  /** Array of items to display in the grid */
  items: MasonryItem[]
  /** Padding around the grid */
  padding?: string
  /** Gap between grid items */
  spacing?: string
  /** Number of columns (responsive) */
  columns?: number
  /** Background color of the grid */
  bg?: string
  /** Background color of each item */
  itemBg?: string
  /** Border radius of items */
  borderRadius?: string
  /** Enable hover effect on items */
  hoverEffect?: boolean
  /** Enable fade-in animation */
  animate?: boolean
  /** Show loading skeletons */
  loading?: boolean
  /** Object fit mode for images */
  objectFit?: 'cover' | 'contain' | 'fill'
  /** Placeholder color while loading */
  placeholderColor?: string
  /** Custom render function for item content */
  renderContent?: (item: MasonryItem, index: number) => React.ReactNode
  /** Custom CSS styles */
  customStyles?: string
  /** Callback when an item is clicked */
  onItemClick?: (item: MasonryItem, index: number) => void
}

interface GridWrapperProps {
  $padding?: string
  $spacing?: string
  $columns: number
  $bg?: string
  $customStyles?: string
}

interface ItemProps {
  $spacing?: string
  $bg?: string
  $borderRadius?: string
  $hoverEffect?: boolean
  $animate?: boolean
}

interface ImageWrapperProps {
  $aspectRatio?: string
  $placeholderColor?: string
}

interface ImageProps {
  $objectFit?: string
  $zoom?: boolean
}

interface ContentProps {
  $padding?: string
}

const GridWrapper = styled.div<GridWrapperProps>`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  background: ${props => props.$bg || 'transparent'};
  padding: ${props => props.$padding || '25px'};
  columns: ${props => props.$columns || 3};
  column-gap: ${props => props.$spacing || '15px'};
  
  @media (max-width: 1200px) {
    columns: ${props => Math.min(props.$columns - 1, 3) || 3};
  }
  
  @media (max-width: 768px) {
    columns: ${props => Math.min(props.$columns - 2, 2) || 2};
  }
  
  @media (max-width: 480px) {
    columns: 1;
  }

  ${props => props.$customStyles}
`

const Item = styled.div<ItemProps>`
  position: relative;
  background: ${props => props.$bg || 'transparent'};
  break-inside: avoid;
  margin-bottom: ${props => props.$spacing || '15px'};
  border-radius: ${props => props.$borderRadius || '7px'};
  overflow: hidden;
  transform: translateZ(0);
  
  ${props => props.$animate && `
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.3s ease forwards;
    
    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}

  &:hover {
    ${props => props.$hoverEffect && `
      transform: translateY(-5px);
      transition: transform 0.2s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `}
  }
`

const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => props.$aspectRatio || '75%'};
  background-color: ${props => props.$placeholderColor || '#f5f5f5'};
`

const Image = styled.img<ImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit || 'cover'};
  transition: transform 0.3s ease;

  ${props => props.$zoom && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`

const Content = styled.div<ContentProps>`
  padding: ${props => props.$padding || '15px'};
`

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  padding,
  spacing,
  columns = 3,
  bg,
  itemBg,
  borderRadius,
  hoverEffect = true,
  animate = true,
  loading = false,
  objectFit = 'cover',
  placeholderColor = '#f5f5f5',
  renderContent,
  customStyles = '',
  onItemClick
}) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoadedImages([])
  }, [items])

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => [...prev, index])
  }

  if (loading) {
    return (
      <GridWrapper 
        $padding={padding} 
        $spacing={spacing} 
        $columns={columns} 
        $bg={bg}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Item key={index} $spacing={spacing}>
            <Skeleton
              height="300px"
              borderRadius={borderRadius || '7px'}
            />
          </Item>
        ))}
      </GridWrapper>
    )
  }

  return (
    <GridWrapper
      ref={gridRef}
      $padding={padding}
      $spacing={spacing}
      $columns={columns}
      $bg={bg}
      $customStyles={customStyles}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          $spacing={spacing}
          $bg={itemBg}
          $borderRadius={borderRadius}
          $hoverEffect={hoverEffect}
          $animate={animate}
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onItemClick?.(item, index)}
        >
          <ImageWrapper
            $aspectRatio={item.aspectRatio}
            $placeholderColor={placeholderColor}
          >
            {!loadedImages.includes(index) && (
              <Skeleton
                height="100%"
                borderRadius={borderRadius || '7px'}
              />
            )}
            <Image
              src={item.image}
              alt={item.alt || ''}
              onLoad={() => handleImageLoad(index)}
              style={{ opacity: loadedImages.includes(index) ? 1 : 0 }}
              $objectFit={objectFit}
              $zoom={hoverEffect}
              loading="lazy"
            />
          </ImageWrapper>
          {renderContent && (
            <Content $padding={item.contentPadding}>
              {renderContent(item, index)}
            </Content>
          )}
        </Item>
      ))}
    </GridWrapper>
  )
}

export default MasonryGrid
