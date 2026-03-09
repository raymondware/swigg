import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const positionStyles = {
  'top-right': `
    top: 16px;
    right: 16px;
    align-items: flex-end;
  `,
  'top-left': `
    top: 16px;
    left: 16px;
    align-items: flex-start;
  `,
  'top-center': `
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  'bottom-right': `
    bottom: 16px;
    right: 16px;
    align-items: flex-end;
  `,
  'bottom-left': `
    bottom: 16px;
    left: 16px;
    align-items: flex-start;
  `,
  'bottom-center': `
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `
}

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
  ${props => positionStyles[props.$position] || positionStyles['top-right']}
  
  & > * {
    pointer-events: auto;
  }
`

/**
 * ToastContainer - Wrapper for positioning multiple toasts
 * 
 * @example
 * <ToastContainer position="top-right">
 *   {toasts.map(toast => (
 *     <Toast key={toast.id} {...toast} />
 *   ))}
 * </ToastContainer>
 */
const ToastContainer = ({
  children,
  position = 'top-right',
  ...props
}) => {
  return (
    <Container
      $position={position}
      role="region"
      aria-label="Notifications"
      {...props}
    >
      {children}
    </Container>
  )
}

ToastContainer.propTypes = {
  /** Toast components */
  children: PropTypes.node,
  /** Position on screen */
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center'
  ])
}

export default ToastContainer
