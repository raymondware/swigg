import React, { useState } from 'react'
import { Alert, Button } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error']
    },
    dismissible: {
      control: 'boolean'
    },
    banner: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    children: 'This is an informational alert message.',
    variant: 'info'
  }
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info">
        This is an info alert. It provides neutral information.
      </Alert>
      <Alert variant="success">
        This is a success alert. Your action was completed successfully.
      </Alert>
      <Alert variant="warning">
        This is a warning alert. Please proceed with caution.
      </Alert>
      <Alert variant="error">
        This is an error alert. Something went wrong.
      </Alert>
    </div>
  )
}

export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Information">
        This alert has a title and description.
      </Alert>
      <Alert variant="success" title="Success!">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to save changes. Please try again.
      </Alert>
    </div>
  )
}

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState(['info', 'success', 'warning', 'error'])
    const removeAlert = (variant: string) => setAlerts(alerts.filter(a => a !== variant))
    const resetAlerts = () => setAlerts(['info', 'success', 'warning', 'error'])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: '#6b7280' }}>All alerts dismissed!</p>
            <Button onClick={resetAlerts}>Reset Alerts</Button>
          </div>
        )}
        {alerts.includes('info') && (
          <Alert variant="info" dismissible onClose={() => removeAlert('info')}>
            Dismissible info alert.
          </Alert>
        )}
        {alerts.includes('success') && (
          <Alert variant="success" dismissible onClose={() => removeAlert('success')}>
            Dismissible success alert.
          </Alert>
        )}
        {alerts.includes('warning') && (
          <Alert variant="warning" dismissible onClose={() => removeAlert('warning')}>
            Dismissible warning alert.
          </Alert>
        )}
        {alerts.includes('error') && (
          <Alert variant="error" dismissible onClose={() => removeAlert('error')}>
            Dismissible error alert.
          </Alert>
        )}
      </div>
    )
  }
}

export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert 
        variant="warning" 
        title="Update Available"
        action={<Button size="sm">Update Now</Button>}
      >
        A new version is available. Update to get the latest features.
      </Alert>
      <Alert 
        variant="error" 
        title="Connection Lost"
        action={<Button size="sm" variant="outline">Retry</Button>}
        dismissible
      >
        Unable to connect to the server. Please check your internet connection.
      </Alert>
    </div>
  )
}

export const Banner: Story = {
  render: () => (
    <div style={{ margin: '-1rem' }}>
      <Alert variant="info" banner>
        🎉 Welcome to our new design system! Check out the updated components.
      </Alert>
    </div>
  )
}

export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" icon={<span style={{ fontSize: '1rem' }}>🔔</span>}>
        Custom notification icon alert.
      </Alert>
      <Alert variant="success" icon={<span style={{ fontSize: '1rem' }}>🎉</span>}>
        Custom celebration icon alert.
      </Alert>
      <Alert variant="warning" icon={null}>
        Alert without any icon.
      </Alert>
    </div>
  )
}

export const ComplexExample: Story = {
  render: () => (
    <Alert 
      variant="warning" 
      title="Action Required"
      action={
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="ghost">Later</Button>
          <Button size="sm">Review</Button>
        </div>
      }
      dismissible
    >
      <p style={{ margin: '0 0 0.5rem' }}>Your account security needs attention.</p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
        <li>Enable two-factor authentication</li>
        <li>Update your recovery email</li>
        <li>Review connected devices</li>
      </ul>
    </Alert>
  )
}

export const InContext: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Alert variant="error" title="Form Error">
          Please correct the errors below before submitting.
        </Alert>
      </div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
          <input 
            type="email" 
            defaultValue="invalid-email"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              border: '2px solid #ef4444' 
            }} 
          />
          <span style={{ fontSize: '0.875rem', color: '#ef4444' }}>Please enter a valid email address</span>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
          <input 
            type="password" 
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              border: '1px solid #e5e7eb' 
            }} 
          />
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  )
}
