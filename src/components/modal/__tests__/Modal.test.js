import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Modal from '../Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>
  }

  it('renders when open', () => {
    const { getByText } = render(<Modal {...defaultProps} />)
    expect(getByText('Modal Content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    const { getByLabelText } = render(
      <Modal {...defaultProps} onClose={onClose} />
    )

    fireEvent.click(getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <Modal {...defaultProps} onClose={onClose} />
    )

    fireEvent.click(getByTestId('modal-overlay'))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when overlay click is disabled', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(
      <Modal
        {...defaultProps}
        onClose={onClose}
        closeOnOverlayClick={false}
      />
    )

    fireEvent.click(getByTestId('modal-overlay'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('applies custom max width', () => {
    const { container } = render(
      <Modal {...defaultProps} maxWidth="800px" />
    )
    expect(container.querySelector('[role="dialog"]')).toHaveStyle({
      maxWidth: '800px'
    })
  })

  it('applies custom styles', () => {
    const { container } = render(
      <Modal {...defaultProps} customStyles="background: #f0f0f0;" />
    )
    expect(container.querySelector('[role="dialog"]')).toHaveStyle({
      background: '#f0f0f0'
    })
  })
})
