import React, { useState } from 'react'
import { Toast, ToastContainer, Button } from '../components'

export default {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info']
    },
    duration: {
      control: 'number'
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center']
    }
  }
}

// Basic Toast
export const Default = {
  args: {
    title: 'Notification',
    message: 'This is a toast message.',
    variant: 'info',
    duration: 0 // Disable auto-dismiss for demo
  }
}

// All Variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Toast
      title="Success!"
      message="Your changes have been saved."
      variant="success"
      duration={0}
    />
    <Toast
      title="Error"
      message="Something went wrong. Please try again."
      variant="error"
      duration={0}
    />
    <Toast
      title="Warning"
      message="Your session will expire in 5 minutes."
      variant="warning"
      duration={0}
    />
    <Toast
      title="Info"
      message="A new version is available."
      variant="info"
      duration={0}
    />
  </div>
)

// Title Only
export const TitleOnly = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Toast title="File uploaded successfully" variant="success" duration={0} />
    <Toast title="Connection lost" variant="error" duration={0} />
  </div>
)

// Without Icon
export const WithoutIcon = () => (
  <Toast
    title="Minimal Toast"
    message="This toast has no icon."
    showIcon={false}
    duration={0}
  />
)

// Without Close Button
export const WithoutCloseButton = () => (
  <Toast
    title="Auto-dismiss only"
    message="This toast will dismiss automatically."
    showCloseButton={false}
    duration={0}
  />
)

// Interactive Demo
export const Interactive = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (variant) => {
    const messages = {
      success: { title: 'Success!', message: 'Operation completed successfully.' },
      error: { title: 'Error', message: 'Something went wrong.' },
      warning: { title: 'Warning', message: 'Please review your input.' },
      info: { title: 'Info', message: 'Here\'s something you should know.' }
    }
    
    const id = Date.now()
    setToasts(prev => [...prev, { id, variant, ...messages[variant] }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <Button onClick={() => addToast('success')}>Success</Button>
        <Button onClick={() => addToast('error')}>Error</Button>
        <Button onClick={() => addToast('warning')}>Warning</Button>
        <Button onClick={() => addToast('info')}>Info</Button>
      </div>
      
      <ToastContainer position="top-right">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            variant={toast.variant}
            duration={5000}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </div>
  )
}

// Position Demo
export const Positions = () => {
  const [position, setPosition] = useState('top-right')
  const [showToast, setShowToast] = useState(false)

  const positions = [
    'top-right', 'top-left', 'top-center',
    'bottom-right', 'bottom-left', 'bottom-center'
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {positions.map(pos => (
          <Button
            key={pos}
            variant={position === pos ? 'primary' : 'secondary'}
            onClick={() => setPosition(pos)}
          >
            {pos}
          </Button>
        ))}
      </div>
      
      <Button onClick={() => setShowToast(true)}>
        Show Toast at {position}
      </Button>

      {showToast && (
        <ToastContainer position={position}>
          <Toast
            title="Position Demo"
            message={`Toast at ${position}`}
            variant="info"
            onClose={() => setShowToast(false)}
          />
        </ToastContainer>
      )}
    </div>
  )
}

// Stacked Toasts
export const StackedToasts = () => (
  <ToastContainer position="top-right">
    <Toast
      title="First notification"
      message="This appeared first."
      variant="info"
      duration={0}
    />
    <Toast
      title="Second notification"
      message="This appeared second."
      variant="success"
      duration={0}
    />
    <Toast
      title="Third notification"
      message="This appeared third."
      variant="warning"
      duration={0}
    />
  </ToastContainer>
)

// Long Content
export const LongContent = () => (
  <Toast
    title="Update Available"
    message="A new version of the application is available. Click here to update now, or the update will be applied automatically on your next restart."
    variant="info"
    duration={0}
  />
)

// Custom Styling
export const CustomStyling = () => (
  <Toast
    title="Custom Toast"
    message="With custom background color"
    customStyles={`
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-left: 4px solid #4c1d95;
      border-radius: 12px;
    `}
    duration={0}
  />
)
