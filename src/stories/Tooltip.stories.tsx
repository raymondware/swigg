import React from 'react'
import { Tooltip, Button } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus']
    },
    variant: {
      control: 'select',
      options: ['dark', 'light']
    },
    arrow: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  )
}

export const Positions: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Tooltip content="Tooltip on top" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  )
}

export const Variants: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      <Tooltip content="Dark tooltip (default)" variant="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light">
        <Button>Light</Button>
      </Tooltip>
    </div>
  )
}

export const Triggers: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      <Tooltip content="Hover triggered" trigger="hover">
        <Button variant="outline">Hover</Button>
      </Tooltip>
      <Tooltip content="Click triggered" trigger="click">
        <Button variant="outline">Click</Button>
      </Tooltip>
      <Tooltip content="Focus triggered" trigger="focus">
        <Button variant="outline">Focus (Tab)</Button>
      </Tooltip>
    </div>
  )
}

export const WithDelay: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      <Tooltip content="No delay" showDelay={0}>
        <Button variant="outline">Instant</Button>
      </Tooltip>
      <Tooltip content="300ms delay" showDelay={300}>
        <Button variant="outline">300ms</Button>
      </Tooltip>
      <Tooltip content="1 second delay" showDelay={1000}>
        <Button variant="outline">1s delay</Button>
      </Tooltip>
    </div>
  )
}

export const NoArrow: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="No arrow pointer" arrow={false}>
        <Button>No Arrow</Button>
      </Tooltip>
    </div>
  )
}

export const RichContent: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
      <Tooltip
        content={
          <div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Tooltip Title</strong>
            <span style={{ opacity: 0.9 }}>This tooltip has rich content with a title and description.</span>
          </div>
        }
        maxWidth="200px"
      >
        <Button>Rich Content</Button>
      </Tooltip>
    </div>
  )
}

export const OnIcons: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
      <Tooltip content="Edit this item">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>✏️</button>
      </Tooltip>
      <Tooltip content="Delete this item">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>🗑️</button>
      </Tooltip>
      <Tooltip content="Share this item">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>📤</button>
      </Tooltip>
      <Tooltip content="More options">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>⋮</button>
      </Tooltip>
    </div>
  )
}

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      <Tooltip content="This tooltip is disabled" disabled>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
      <Tooltip content="This tooltip works">
        <Button>Active Tooltip</Button>
      </Tooltip>
    </div>
  )
}

export const OnText: Story = {
  render: () => (
    <div style={{ padding: '3rem' }}>
      <p>
        You can use tooltips on any element, including{' '}
        <Tooltip content="This is inline text" variant="dark">
          <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>inline text</span>
        </Tooltip>{' '}
        within a paragraph.
      </p>
    </div>
  )
}
