import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Skeleton from '../skeleton'

const GridWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  background: ${props => props.bg || 'transparent'};
  padding: ${props => props.padding || '25px'};
  columns: ${props => props.columns || 3};
  column-gap: ${props => props.spacing || '15px'};
  
  @media (max-width: 1200px) {
    columns: ${props => Math.min(props.columns - 1, 3) || 3};
  }
  
  @media (max-width: 768px) {
    columns: ${props => Math.min(props.columns - 2, 2) || 2};
  }
  
  @media (max-width: 480px) {
    columns: 1;
  }

  ${props => props.customStyles}
`

const Item = styled.div`
  position: relative;
  background: ${props => props.bg || 'transparent'};
  break-inside: avoid;
  margin-bottom: ${props => props.spacing || '15px'};
  border-radius: ${props => props.borderRadius || '7px'};
  overflow: hidden;
  transform: translateZ(0); /* Fix for Chrome rendering issue */
  
  ${props => props.animate && `
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
    ${props => props.hoverEffect && `
      transform: translateY(-5px);
      transition: transform 0.2s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `}
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => props.aspectRatio || '75%'};
  background-color: ${props => props.placeholderColor || '#f5f5f5'};
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: transform 0.3s ease;

  ${props => props.zoom && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`

const Content = styled.div`
  padding: ${props => props.padding || '15px'};
`

const MasonryGrid = ({
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
  const [loadedImages, setLoadedImages] = useState([])
  const gridRef = useRef(null)

  useEffect(() => {
    setLoadedImages([])
  }, [items])

  const handleImageLoad = (index) => {
    setLoadedImages(prev => [...prev, index])
  }

  if (loading) {
    return (
      <GridWrapper padding={padding} spacing={spacing} columns={columns} bg={bg}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Item key={index} spacing={spacing}>
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
      padding={padding}
      spacing={spacing}
      columns={columns}
      bg={bg}
      customStyles={customStyles}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          spacing={spacing}
          bg={itemBg}
          borderRadius={borderRadius}
          hoverEffect={hoverEffect}
          animate={animate}
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onItemClick?.(item, index)}
        >
          <ImageWrapper
            aspectRatio={item.aspectRatio}
            placeholderColor={placeholderColor}
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
              objectFit={objectFit}
              zoom={hoverEffect}
              loading="lazy"
            />
          </ImageWrapper>
          {renderContent && (
            <Content padding={item.contentPadding}>
              {renderContent(item, index)}
            </Content>
          )}
        </Item>
      ))}
    </GridWrapper>
  )
}

MasonryGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    aspectRatio: PropTypes.string,
    contentPadding: PropTypes.string
  })).isRequired,
  padding: PropTypes.string,
  spacing: PropTypes.string,
  columns: PropTypes.number,
  bg: PropTypes.string,
  itemBg: PropTypes.string,
  borderRadius: PropTypes.string,
  hoverEffect: PropTypes.bool,
  animate: PropTypes.bool,
  loading: PropTypes.bool,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill']),
  placeholderColor: PropTypes.string,
  renderContent: PropTypes.func,
  customStyles: PropTypes.string,
  onItemClick: PropTypes.func
}

export default MasonryGrid
