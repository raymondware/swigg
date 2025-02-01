import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
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
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: ${props => props.maxWidth || '500px'};
  width: 90%;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: transform 0.3s ease;
  position: relative;
  ${props => props.customStyles}
`;

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

  &:hover {
    opacity: 1;
  }
`;

const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  showCloseButton = true,
  customStyles = '',
  closeOnOverlayClick = true
}) => {
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer 
        isOpen={isOpen} 
        maxWidth={maxWidth}
        customStyles={customStyles}
      >
        {showCloseButton && (
          <CloseButton onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  showCloseButton: PropTypes.bool,
  customStyles: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool
};

export default Modal; 