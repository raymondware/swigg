import React from 'react'
import styled from 'styled-components'

const lightenDarkenColor = (col, amt) => {
  let usePound = false

  if (col[0] === '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

const PrimaryButton = styled.div`
  background: ${props => props.bgOverlay || '#7162e8'};
  width: 100%;
  max-width: 300px;
  padding: 15px 7px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  border-radius: 25px;
  font-size: 1em;
  font-weight: bold;
  transition: all 0.5s ease 0s;
  cursor: pointer;
  line-height: 1em;

  &:hover {
    background-color: ${props => (props.bgOverlay ? lightenDarkenColor(props.bgOverlay, -20) : lightenDarkenColor('#7162e8', -20))};
  }

  ${props => props?.customStyles ? props.customStyles : ''}
`

const Button = props => {
  return (
    <PrimaryButton {...props}>
      {props.children}
    </PrimaryButton>
  )
}

Button.displayName = 'Button';

export default Button
