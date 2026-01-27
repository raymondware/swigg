import React from 'react'
import { Button } from '../components'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button'
    },
    children: {
      control: 'text',
      description: 'Button text'
    }
  }
}

// Default story
export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  }
}

// All variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
)

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)

// Loading states
export const Loading = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button loading>Loading...</Button>
    <Button variant="secondary" loading>Processing</Button>
    <Button variant="outline" loading>Please wait</Button>
    <Button variant="destructive" loading>Deleting</Button>
  </div>
)

// Disabled states
export const Disabled = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>Disabled</Button>
    <Button variant="outline" disabled>Disabled</Button>
    <Button variant="destructive" disabled>Disabled</Button>
  </div>
)

// With icons (using Unicode for demo)
export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button iconLeft={<span>←</span>}>Back</Button>
    <Button iconRight={<span>→</span>}>Next</Button>
    <Button iconLeft={<span>+</span>}>Add Item</Button>
    <Button variant="destructive" iconLeft={<span>🗑</span>}>Delete</Button>
  </div>
)

// Full width
export const FullWidth = () => (
  <div style={{ width: '300px' }}>
    <Button fullWidth>Full Width Button</Button>
  </div>
)

// Button as link
export const AsLink = () => (
  <Button as="a" href="https://example.com" target="_blank">
    Link Button
  </Button>
)

// Interactive playground
export const Playground = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false
  }
}

// Real-world examples
export const Examples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>Form Actions</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="ghost">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
    
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>Confirmation Dialog</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
    
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>Social Actions</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="secondary" size="sm">Follow</Button>
        <Button variant="ghost" size="sm">Share</Button>
        <Button variant="link" size="sm">View Profile</Button>
      </div>
    </div>
  </div>
)
