import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'click' | 'focus'
export type TooltipVariant = 'dark' | 'light'

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode
  /** Element that triggers the tooltip */
  children: React.ReactElement
  /** Position relative to trigger */
  position?: TooltipPosition
  /** How to trigger the tooltip */
  trigger?: TooltipTrigger | TooltipTrigger[]
  /** Visual variant */
  variant?: TooltipVariant
  /** Show arrow pointer */
  arrow?: boolean
  /** Delay before showing (ms) */
  showDelay?: number
  /** Delay before hiding (ms) */
  hideDelay?: number
  /** Whether tooltip is disabled */
  disabled?: boolean
  /** Maximum width */
  maxWidth?: string
  /** Additional class name */
  className?: string
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Z-index for the tooltip */
  zIndex?: number
}

interface TooltipContentProps {
  $position: TooltipPosition
  $variant: TooltipVariant
  $arrow: boolean
  $maxWidth: string
  $zIndex: number
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const positionStyles = {
  top: css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
  `,
  bottom: css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
  `,
  left: css`
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;
  `,
  right: css`
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
  `
}

const arrowStyles = {
  top: css`
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  `,
  bottom: css`
    top: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  `,
  left: css`
    right: -4px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  `,
  right: css`
    left: -4px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  `
}

const variantStyles = {
  dark: css`
    background: #1f2937;
    color: white;
  `,
  light: css`
    background: white;
    color: #374151;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
  `
}

const Container = styled.div`
  position: relative;
  display: inline-flex;
`

const TooltipContent = styled.div<TooltipContentProps>`
  position: absolute;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: normal;
  z-index: ${props => props.$zIndex};
  animation: ${fadeIn} 0.15s ease;
  max-width: ${props => props.$maxWidth};
  
  ${props => positionStyles[props.$position]}
  ${props => variantStyles[props.$variant]}
  
  ${props => props.$arrow && css`
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      ${props.$variant === 'dark' ? 'background: #1f2937;' : 'background: white;'}
      ${arrowStyles[props.$position]}
    }
  `}
`

const TriggerWrapper = styled.span`
  display: inline-flex;
`

/**
 * Tooltip component for displaying additional information on hover, click, or focus.
 * Supports multiple positions, triggers, and visual variants.
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip" position="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * 
 * <Tooltip content="Click triggered" trigger="click" variant="light">
 *   <span>Click me</span>
 * </Tooltip>
 * ```
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  variant = 'dark',
  arrow = true,
  showDelay = 0,
  hideDelay = 0,
  disabled = false,
  maxWidth = '250px',
  className,
  open: controlledOpen,
  onOpenChange,
  zIndex = 1000
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const showTimeoutRef = useRef<number>()
  const hideTimeoutRef = useRef<number>()
  
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  
  const triggers = Array.isArray(trigger) ? trigger : [trigger]

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current)
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const show = useCallback(() => {
    if (disabled) return
    clearTimeouts()
    
    if (showDelay > 0) {
      showTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalOpen(true)
        onOpenChange?.(true)
      }, showDelay)
    } else {
      if (!isControlled) setInternalOpen(true)
      onOpenChange?.(true)
    }
  }, [disabled, showDelay, isControlled, onOpenChange, clearTimeouts])

  const hide = useCallback(() => {
    clearTimeouts()
    
    if (hideDelay > 0) {
      hideTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalOpen(false)
        onOpenChange?.(false)
      }, hideDelay)
    } else {
      if (!isControlled) setInternalOpen(false)
      onOpenChange?.(false)
    }
  }, [hideDelay, isControlled, onOpenChange, clearTimeouts])

  const toggle = useCallback(() => {
    if (isOpen) {
      hide()
    } else {
      show()
    }
  }, [isOpen, show, hide])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearTimeouts()
  }, [clearTimeouts])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        hide()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, hide])

  // Build event handlers based on triggers
  const eventHandlers: Record<string, () => void> = {}
  
  if (triggers.includes('hover')) {
    eventHandlers.onMouseEnter = show
    eventHandlers.onMouseLeave = hide
  }
  
  if (triggers.includes('focus')) {
    eventHandlers.onFocus = show
    eventHandlers.onBlur = hide
  }
  
  if (triggers.includes('click')) {
    eventHandlers.onClick = toggle
  }

  const childElement = React.cloneElement(children, {
    ...eventHandlers,
    'aria-describedby': isOpen ? 'tooltip-content' : undefined
  })

  return (
    <Container className={className}>
      <TriggerWrapper {...(triggers.includes('hover') ? { onMouseEnter: show, onMouseLeave: hide } : {})}>
        {childElement}
      </TriggerWrapper>
      {isOpen && content && (
        <TooltipContent
          id="tooltip-content"
          role="tooltip"
          $position={position}
          $variant={variant}
          $arrow={arrow}
          $maxWidth={maxWidth}
          $zIndex={zIndex}
        >
          {content}
        </TooltipContent>
      )}
    </Container>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
