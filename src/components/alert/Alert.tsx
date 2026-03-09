import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  /** Alert variant/type */
  variant?: AlertVariant
  /** Alert title */
  title?: React.ReactNode
  /** Alert description/content */
  children: React.ReactNode
  /** Whether alert is dismissible */
  dismissible?: boolean
  /** Callback when alert is dismissed */
  onClose?: () => void
  /** Custom icon (null to hide default) */
  icon?: React.ReactNode | null
  /** Action element (button/link) */
  action?: React.ReactNode
  /** Additional class name */
  className?: string
  /** Full width banner style */
  banner?: boolean
}

interface StyledAlertProps {
  $variant: AlertVariant
  $banner: boolean
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const variantConfig = {
  info: {
    bg: '#eff6ff',
    border: '#3b82f6',
    text: '#1e40af',
    icon: 'ℹ'
  },
  success: {
    bg: '#f0fdf4',
    border: '#10b981',
    text: '#166534',
    icon: '✓'
  },
  warning: {
    bg: '#fffbeb',
    border: '#f59e0b',
    text: '#92400e',
    icon: '⚠'
  },
  error: {
    bg: '#fef2f2',
    border: '#ef4444',
    text: '#991b1b',
    icon: '✕'
  }
}

const AlertContainer = styled.div<StyledAlertProps>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  animation: ${fadeIn} 0.2s ease;
  
  ${props => {
    const config = variantConfig[props.$variant]
    return css`
      background: ${config.bg};
      border-left: 4px solid ${config.border};
      color: ${config.text};
    `
  }}
  
  ${props => props.$banner ? css`
    border-radius: 0;
    border-left: none;
    border-bottom: 1px solid ${variantConfig[props.$variant].border};
  ` : css`
    border-radius: 8px;
  `}
`

const IconWrapper = styled.span<{ $variant: AlertVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => variantConfig[props.$variant].border};
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  line-height: 1.4;
`

const Description = styled.div`
  font-size: 0.9375rem;
  line-height: 1.5;
  opacity: 0.9;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
`

const CloseButton = styled.button<{ $variant: AlertVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${props => variantConfig[props.$variant].text};
  opacity: 0.7;
  transition: opacity 0.15s ease, background 0.15s ease;
  font-size: 18px;
  line-height: 1;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }
  
  &:focus-visible {
    outline: 2px solid ${props => variantConfig[props.$variant].border};
    outline-offset: 2px;
  }
`

/**
 * Alert/Banner component for displaying important messages.
 * Supports info, success, warning, and error variants with optional icons,
 * title, description, and dismissible functionality.
 * 
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 * 
 * <Alert 
 *   variant="warning" 
 *   dismissible 
 *   onClose={() => setShowAlert(false)}
 *   action={<Button size="sm">View</Button>}
 * >
 *   Please review the pending changes.
 * </Alert>
 * 
 * <Alert variant="error" banner>
 *   System maintenance scheduled for tonight.
 * </Alert>
 * ```
 */
const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onClose,
  icon,
  action,
  className,
  banner = false
}) => {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  if (!visible) return null

  const config = variantConfig[variant]
  const showIcon = icon !== null
  const iconElement = icon ?? <span>{config.icon}</span>

  return (
    <AlertContainer
      className={className}
      $variant={variant}
      $banner={banner}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <IconWrapper $variant={variant} aria-hidden="true">
          {iconElement}
        </IconWrapper>
      )}
      
      <Content>
        {title && <Title>{title}</Title>}
        <Description>{children}</Description>
      </Content>
      
      <Actions>
        {action}
        {dismissible && (
          <CloseButton
            onClick={handleClose}
            $variant={variant}
            aria-label="Dismiss alert"
            type="button"
          >
            ×
          </CloseButton>
        )}
      </Actions>
    </AlertContainer>
  )
}

Alert.displayName = 'Alert'

export default Alert
