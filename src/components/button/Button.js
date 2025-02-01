import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { lightenDarkenColor } from './utils'

const buttonStyles = css`
  width: 100%;
  max-width: 300px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSizes.md};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: ${props => props.theme.typography.lineHeights.normal};
  
  &:focus {
    outline: none;
  }
`

const PrimaryButton = styled.button`
  ${buttonStyles}
  background: ${props => props.bgOverlay || props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    background-color: ${props => 
      props.bgOverlay
        ? lightenDarkenColor(props.bgOverlay, -20)
        : lightenDarkenColor(props.theme.colors.primary, -20)
    };
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }

  ${props => props?.customStyles}
`

const SecondaryButton = styled.button`
  ${buttonStyles}
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.primary}11;
    border-color: ${props => lightenDarkenColor(props.theme.colors.primary, -20)};
    color: ${props => lightenDarkenColor(props.theme.colors.primary, -20)};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }

  ${props => props?.customStyles}
`

const Button = ({ variant = 'primary', ...props }) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props} />
    default:
      return <PrimaryButton {...props} />
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  bgOverlay: PropTypes.string,
  customStyles: PropTypes.string
}

Button.displayName = 'Button'

export default Button
