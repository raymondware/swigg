import React, { ReactNode } from 'react'
import styled from 'styled-components'

/** Props for the Overlay component */
export interface OverlayProps {
  /** Background color */
  bg?: string
  /** Opacity value (0-1) */
  opacityVal?: string
  /** Display property */
  display?: string
  /** Media breakpoint to show overlay */
  mediaDisplay?: string
}

/** Props for the ProjectCard component */
export interface ProjectCardProps {
  /** Maximum width of the card */
  maxWidth?: string
  /** Project title */
  title?: string
  /** Link URL */
  link?: string
  /** Description content */
  children?: ReactNode
  /** Background overlay color/gradient */
  bgOverlay?: string
  /** Header background image URL */
  bgImage?: string
  /** List of technologies used */
  techList?: string[]
  /** Enable hover animation */
  animation?: boolean
  /** Custom CSS styles */
  customStyles?: string
}

interface WrapperProps {
  $maxWidth?: string
  $bgOverlay?: string
  $animation: boolean
  $customStyles?: string
}

interface ProjectHeaderProps {
  $bgImage?: string
}

interface OverlayContainerProps {
  $bg?: string
  $opacityVal?: string
  $display?: string
  $mediaDisplay?: string
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  max-width: ${props => props.$maxWidth || '350px'};
  margin: 0 auto;
  box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
            0 5px 15px 0 rgba(0,0,0,0.08);
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  overflow: hidden;
  position: relative;
  background: ${props => props.$bgOverlay};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  font-family: "helvetica", arial, sans-serif;
  transition: all .5s;

  ${props => props.$animation
    ? `&:hover {
        cursor: pointer;
        transform: scale(1.05) translateY(-5px);

        h2 {
          color: #000;
        }
      }`
    : ''}

  ${props => props.$customStyles ? props.$customStyles : ''}
`

const ProjectHeader = styled.div<ProjectHeaderProps>`
  width: 100%;
  margin: 0 auto;
  height: 145px; 
  position: relative;
  overflow: hidden;  
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.$bgImage});
  background-repeat: no-repeat;

  &:after {
    content: '';
    width: 145%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: rotate(-20deg) scale(1);
  }
`

const ProjectContent = styled.div`
  background: #fff;
  padding: 25px 20px;
  color: #413E46;
  text-shadow: none;
  height: 100%;

  p {
    color: #BAB9BE;
    font-size: .75em;
    text-align: left;
    margin: 0 0 0 0;
  }
`

const Text = styled.div`
  font-size: .9em;
  margin: 0 0 5px 0;
`

const Title = styled.h3`
  font-family: 'ubuntu', Helvetica, Arial, sans-serif;
  font-size: 1.25em;
  font-weight: 700;
  margin: 0 0 5px 0;
`

const OverlayContainer = styled.div<OverlayContainerProps>`
  width: 100%;
  height: 100%; 
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2222;
  background: ${props => props.$bg || '#333'};
  opacity: ${props => props.$opacityVal || '.7'};
  display: ${props => props.$display || 'none'};
  @media screen and (max-width: ${props => props.$mediaDisplay || '960px'}) {
    display: block;
  }
`

const Overlay: React.FC<OverlayProps> = ({ 
  bg, 
  opacityVal, 
  display, 
  mediaDisplay 
}) => (
  <OverlayContainer 
    $bg={bg} 
    $opacityVal={opacityVal} 
    $display={display} 
    $mediaDisplay={mediaDisplay}
    aria-hidden="true"
  />
)

/**
 * ProjectCard - A card component for showcasing projects
 *
 * @example
 * <ProjectCard
 *   title="My Project"
 *   bgImage="/project-image.jpg"
 *   techList={['React', 'TypeScript', 'Node.js']}
 *   animation
 * >
 *   A description of this amazing project
 * </ProjectCard>
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  maxWidth = '450px',
  title = 'Title',
  link = '',
  children = 'Description',
  bgOverlay = 'linear-gradient(45deg, #333, #f7f7f7)',
  bgImage = '',
  techList = [],
  animation = false,
  customStyles
}) => {
  const cardContent = (
    <Wrapper 
      $maxWidth={maxWidth}
      $bgOverlay={bgOverlay}
      $animation={animation}
      $customStyles={customStyles}
      data-sal="slide-up" 
      data-sal-delay="100" 
      data-sal-easing="ease-in"
      role="article"
    >
      <ProjectHeader $bgImage={bgImage}>
        <Overlay bg={bgOverlay} opacityVal=".75" display="block" />
      </ProjectHeader>
      <ProjectContent>
        <Title>{title}</Title>
        <Text>{children}</Text>
        {techList.length > 0 && (
          <p aria-label="Technologies used">{techList.join(', ')}</p>
        )}
      </ProjectContent>
    </Wrapper>
  )

  // If there's a link, wrap in an anchor tag
  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        aria-label={`View ${title} project`}
      >
        {cardContent}
      </a>
    )
  }

  return cardContent
}

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
