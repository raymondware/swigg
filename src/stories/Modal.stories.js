import React, { useState } from 'react'
import { Modal, Button } from '../components'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal'
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the modal'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal'
    },
    customStyles: {
      control: 'text',
      description: 'Custom CSS styles for the modal container'
    }
  }
}

export default meta

// Interactive example with state management
const InteractiveTemplate = args => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Example Modal</h2>
        <p>This is a basic modal example with some content.</p>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </Modal>
    </div>
  )
}

export const Default = InteractiveTemplate.bind({})
Default.args = {
  maxWidth: '500px',
  showCloseButton: true,
  closeOnOverlayClick: true
}

export const CustomWidth = InteractiveTemplate.bind({})
CustomWidth.args = {
  maxWidth: '800px',
  showCloseButton: true,
  closeOnOverlayClick: true,
  children: (
    <div>
      <h2>Wide Modal</h2>
      <p>This modal has a custom width of 800px.</p>
    </div>
  )
}

export const NoCloseButton = InteractiveTemplate.bind({})
NoCloseButton.args = {
  showCloseButton: false,
  closeOnOverlayClick: true,
  children: (
    <div>
      <h2>No Close Button</h2>
      <p>This modal doesn&apos;t show the close button in the corner.</p>
    </div>
  )
}

export const CustomStyles = InteractiveTemplate.bind({})
CustomStyles.args = {
  customStyles: `
    background: #f5f5f5;
    border: 2px solid #333;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `,
  children: (
    <div>
      <h2>Custom Styled Modal</h2>
      <p>This modal has custom styles applied to it.</p>
    </div>
  )
}

// Example of a form in a modal
export const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="400px"
      >
        <h2>Contact Form</h2>
        <form onSubmit={e => {
          e.preventDefault()
          setIsOpen(false)
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Name:
              <input type="text" style={{ display: 'block', width: '100%', marginTop: '0.5rem' }} />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Email:
              <input type="email" style={{ display: 'block', width: '100%', marginTop: '0.5rem' }} />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Message:
              <textarea style={{ display: 'block', width: '100%', marginTop: '0.5rem' }} rows="4" />
            </label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  )
}
