import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
width: 100%;
max-width: ${props => props.maxWidth || '350px'};
margin: 0 auto;
box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
          0 5px 15px 0 rgba(0,0,0,0.08);
border-radius: 10px;
text-decoration: none;
color: #fff;
overflow: hidden;
position: relative;
background: ${props => props.bgOverlay};
background-repeat: no-repeat;
background-size: cover;
background-position: center top;
position: relative;
font-family: "helvetica", arial, sans-serif;
transition: all .5s;

${props => props.animation
? `&:hover {
    cursor: pointer;
    transform: scale(1.05) translateY(-5px);

    h2 {
      color: #000;
    }
  }`
: ''}

  ${props => props?.customStyles ? props.customStyles : ''}
`

const ProjectHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 145px; 
  position: relative;
  overflow: hidden;  
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.bgImage});
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

const Title = styled.div`
  font-family: 'ubuntu', Helvetica, Arial, sans-serif;
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 5px;
`

const OverlayContainer = styled.div`
    width: 100%;
    height: 100%; 
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2222;
    background: ${props => props.bg || '#333'};
    opacity: ${props => props.opacityVal || '.7'};
    display: ${props => props.display || 'none'};
    @media screen and (max-width: ${props => props.mediaDisplay || '960px'}) {
        display: block;
    }
`

const Overlay = ({ bg, opacityVal, display, mediaDisplay }) => (<OverlayContainer bg={bg} opacityVal={opacityVal} display={display} mediaDisplay={mediaDisplay} />)

// TODO: Add href and aria if there is a link
const ProjectCard = props => (
  <Wrapper {...props} data-sal='slide-up' data-sal-delay='100' data-sal-easing='ease-in' target='_blank' rel='noopener noreferrer'>
    <ProjectHeader bgImage={props.bgImage}>
      <Overlay bg={props.bgOverlay} opacityVal='.75' display='block' />
    </ProjectHeader >
    <ProjectContent>
      <Title>{props.title}</Title>
      <Text>{props.children}</Text>
      <p>{props.techList.join(', ')}</p>
    </ProjectContent>
  </Wrapper>
)

ProjectCard.propTypes = {
  maxWidth: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  bgOverlay: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
  techList: PropTypes.array.isRequired,
  animation: PropTypes.bool
}

ProjectCard.defaultProps = {
  maxWidth: '450px',
  title: 'Title',
  link: '',
  children: 'Description',
  bgOverlay: 'linear-gradient(45deg, #333, #f7f7f7)',
  bgImage: '',
  techList: [],
  animation: false
}

Overlay.propTypes = {
  bg: PropTypes.string,
  opacityVal: PropTypes.string,
  display: PropTypes.string,
  mediaDisplay: PropTypes.string
}

Overlay.defaultProps = {
  bg: '#333',
  opacityVal: '.7',
  display: 'none',
  mediaDisplay: '960px'
}

export default ProjectCard
