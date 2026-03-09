import React, { useEffect, useCallback, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'

export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen'

export interface ModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean
  /** Callback function when the modal should close */
  onClose: () => void
  /** Modal content (use ModalHeader, ModalBody, ModalFooter for structured content) */
  children: React.ReactNode
  /** Size of the modal */
  size?: ModalSize
  /** Maximum width of the modal (overrides size) */
  maxWidth?: string
  /** Whether to show the close button */
  showCloseButton?: boolean
  /** Custom CSS styles for the modal container */
  customStyles?: string
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean
  /** Accessible label for the modal */
  ariaLabel?: string
  /** Accessible description ID */
  ariaDescribedBy?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** Additional class name */
  className?: string
}

export interface ModalHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export interface ModalFooterProps {
  children: React.ReactNode
  className?: string
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right'
}

interface OverlayProps {
  $isOpen: boolean
}

interface ModalContainerProps {
  $isOpen: boolean
  $size: ModalSize
  $maxWidth?: string
  $customStyles?: string
}

interface FooterStyledProps {
  $align: 'left' | 'center' | 'right'
}

// Size configurations
const sizeStyles = {
  sm: css`
    max-width: 400px;
  `,
  md: css`
    max-width: 560px;
  `,
  lg: css`
    max-width: 800px;
  `,
  fullscreen: css`
    max-width: 100%;
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  `
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.2s ease` : 'none'};
  padding: 1rem;

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`

const ModalContainer = styled.div<ModalContainerProps>`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${props => props.$isOpen ? css`${scaleIn} 0.2s ease` : 'none'};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Size */
  ${props => props.$maxWidth ? css`max-width: ${props.$maxWidth};` : sizeStyles[props.$size]}
  
  /* Fullscreen adjustments */
  ${props => props.$size === 'fullscreen' && css`
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  `}

  @media (max-width: 640px) {
    width: 100%;
    max-height: 95vh;
  }

  ${props => props.$customStyles}
`

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, background 0.2s;
  padding: 4px 8px;
  border-radius: 6px;
  z-index: 10;
  line-height: 1;
  color: inherit;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: 2px solid ${props => props.theme?.colors?.primary || '#7162e8'};
    outline-offset: 2px;
    opacity: 1;
  }
`

const HeaderStyled = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-right: 3rem; /* Space for close button */
  
  h2, h3, h4 {
    margin: 0;
    font-weight: 600;
    color: #111827;
  }
`

const BodyStyled = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`

const FooterStyled = styled.div<FooterStyledProps>`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: ${props => {
    switch (props.$align) {
      case 'left': return 'flex-start'
      case 'center': return 'center'
      case 'right': return 'flex-end'
      default: return 'flex-end'
    }
  }};
`

/**
 * Modal header section with proper styling
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => (
  <HeaderStyled className={className}>{children}</HeaderStyled>
)

/**
 * Modal body section with scrollable content
 */
export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <BodyStyled className={className}>{children}</BodyStyled>
)

/**
 * Modal footer section with action buttons
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className, align = 'right' }) => (
  <FooterStyled className={className} $align={align}>{children}</FooterStyled>
)

/**
 * Modal dialog component with overlay, close button, and animations.
 * Supports multiple sizes and structured content via ModalHeader, ModalBody, ModalFooter.
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} size="md">
 *   <ModalHeader><h2>Title</h2></ModalHeader>
 *   <ModalBody>Content here</ModalBody>
 *   <ModalFooter>
 *     <Button onClick={handleClose}>Close</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  maxWidth,
  showCloseButton = true,
  customStyles = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ariaLabel,
  ariaDescribedBy,
  className,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape' && isOpen) {
      onClose()
    }
  }, [closeOnEscape, isOpen, onClose])

  // Handle escape key, focus trap, and body scroll
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      
      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus()
      }, 0)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, handleKeyDown])

  return (
    <Overlay
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      data-testid={props['data-testid'] || 'modal-overlay'}
      aria-hidden={!isOpen}
    >
      <ModalContainer
        ref={modalRef}
        $isOpen={isOpen}
        $size={size}
        $maxWidth={maxWidth}
        $customStyles={customStyles}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={className}
        tabIndex={-1}
      >
        {showCloseButton && (
          <CloseButton 
            onClick={onClose} 
            aria-label="Close modal"
            type="button"
          >
            ×
          </CloseButton>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  )
}

Modal.displayName = 'Modal'

export default Modal
