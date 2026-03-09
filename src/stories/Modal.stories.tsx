import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fullscreen'],
      description: 'Size of the modal'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal'
    }
  }
}

export default meta
type Story = StoryObj<typeof Modal>

// Interactive template with state
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <h2>Modal Title</h2>
        </ModalHeader>
        <ModalBody>
          <p>This is the modal body content. You can put anything here.</p>
          <p>The modal supports multiple sizes and can be dismissed by clicking outside or pressing Escape.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    size: 'md',
    showCloseButton: true,
    closeOnOverlayClick: true
  }
}

export const Small: Story = {
  render: InteractiveTemplate,
  args: {
    size: 'sm',
    showCloseButton: true
  }
}

export const Large: Story = {
  render: InteractiveTemplate,
  args: {
    size: 'lg',
    showCloseButton: true
  }
}

export const Fullscreen: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Fullscreen Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} size="fullscreen">
          <ModalHeader>
            <h2>Fullscreen Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This modal takes up the entire screen.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader>
            <h2>Contact Form</h2>
          </ModalHeader>
          <ModalBody>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                <input type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea rows={4} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
