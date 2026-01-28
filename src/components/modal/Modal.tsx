import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

export interface ModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean
  /** Callback function when the modal should close */
  onClose: () => void
  /** Modal content */
  children: React.ReactNode
  /** Maximum width of the modal */
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
}

interface OverlayProps {
  $isOpen: boolean
}

interface ModalContainerProps {
  $isOpen: boolean
  $maxWidth?: string
  $customStyles?: string
}

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
  transition: all 0.3s ease;
`

const ModalContainer = styled.div<ModalContainerProps>`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: ${props => props.$maxWidth || '500px'};
  width: 90%;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: transform 0.3s ease;
  position: relative;
  ${props => props.$customStyles}
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  showCloseButton = true,
  customStyles = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ariaLabel,
  ariaDescribedBy,
  ...props
}) => {
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

  // Handle escape key and focus trap
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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
        $isOpen={isOpen}
        $maxWidth={maxWidth}
        $customStyles={customStyles}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
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

export default Modal
