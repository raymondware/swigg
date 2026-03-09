import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

const variantStyles = {
  success: css`
    background: #10b981;
    border-left: 4px solid #059669;
  `,
  error: css`
    background: #ef4444;
    border-left: 4px solid #dc2626;
  `,
  warning: css`
    background: #f59e0b;
    border-left: 4px solid #d97706;
  `,
  info: css`
    background: #3b82f6;
    border-left: 4px solid #2563eb;
  `
}

const variantIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}

const ToastWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 280px;
  max-width: 400px;
  padding: 16px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${props => props.$isExiting ? slideOut : slideIn} 0.3s ease forwards;
  ${props => variantStyles[props.$variant] || variantStyles.info}
  ${props => props.$customStyles}
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  flex-shrink: 0;
`

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: ${props => props.$hasMessage ? '4px' : '0'};
`

const Message = styled.div`
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.4;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  opacity: 0.7;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`

const Toast = ({
  title,
  message,
  variant = 'info',
  duration = 5000,
  onClose,
  showIcon = true,
  showCloseButton = true,
  customStyles,
  ...props
}) => {
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose && onClose()
    }, 300) // Match animation duration
  }, [onClose])

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  return (
    <ToastWrapper
      $variant={variant}
      $isExiting={isExiting}
      $customStyles={customStyles}
      role="alert"
      aria-live="polite"
      {...props}
    >
      {showIcon && (
        <IconWrapper aria-hidden="true">
          {variantIcons[variant]}
        </IconWrapper>
      )}
      <ContentWrapper>
        {title && <Title $hasMessage={!!message}>{title}</Title>}
        {message && <Message>{message}</Message>}
      </ContentWrapper>
      {showCloseButton && (
        <CloseButton
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          ×
        </CloseButton>
      )}
    </ToastWrapper>
  )
}

Toast.propTypes = {
  /** Toast title (bold text) */
  title: PropTypes.string,
  /** Toast message (description) */
  message: PropTypes.string,
  /** Visual style variant */
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration: PropTypes.number,
  /** Callback when toast is dismissed */
  onClose: PropTypes.func,
  /** Show variant icon */
  showIcon: PropTypes.bool,
  /** Show close button */
  showCloseButton: PropTypes.bool,
  /** Custom styled-components CSS */
  customStyles: PropTypes.string
}

export default Toast
