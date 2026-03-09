import React, { useState } from 'react'
import { Badge, Tag } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle']
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'gray']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    dot: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'subtle',
    color: 'primary'
  }
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="solid" color="primary">Solid</Badge>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="subtle" color="primary">Subtle</Badge>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge color="primary">Primary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="gray">Gray</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="outline" color="primary">Primary</Badge>
        <Badge variant="outline" color="success">Success</Badge>
        <Badge variant="outline" color="warning">Warning</Badge>
        <Badge variant="outline" color="error">Error</Badge>
        <Badge variant="outline" color="gray">Gray</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="solid" color="primary">Primary</Badge>
        <Badge variant="solid" color="success">Success</Badge>
        <Badge variant="solid" color="warning">Warning</Badge>
        <Badge variant="solid" color="error">Error</Badge>
        <Badge variant="solid" color="gray">Gray</Badge>
      </div>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge size="sm" color="primary">Small</Badge>
      <Badge size="md" color="primary">Medium</Badge>
      <Badge size="lg" color="primary">Large</Badge>
    </div>
  )
}

export const DotIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge dot color="success" /> Online
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge dot color="error" /> Offline
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge dot color="warning" /> Away
      </div>
    </div>
  )
}

export const Tags: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js', 'GraphQL'])
    const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <Tag key={tag} dismissible onClose={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
    )
  }
}

export const TagColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="gray">Gray</Tag>
    </div>
  )
}

export const TagsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag color="primary" icon="⚛️">React</Tag>
      <Tag color="success" icon="✓" dismissible>Verified</Tag>
      <Tag color="warning" icon="⚠️">Warning</Tag>
      <Tag color="gray" icon="📁">Folder</Tag>
    </div>
  )
}

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
        <span style={{ fontWeight: 500 }}>Order #12345</span>
        <Badge color="success" variant="subtle">Completed</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
        <span style={{ fontWeight: 500 }}>Order #12346</span>
        <Badge color="warning" variant="subtle">Processing</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
        <span style={{ fontWeight: 500 }}>Order #12347</span>
        <Badge color="error" variant="subtle">Cancelled</Badge>
      </div>
    </div>
  )
}

export const CountBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <span style={{ fontSize: '1.5rem' }}>📬</span>
        <Badge 
          variant="solid" 
          color="error" 
          size="sm"
          style={{ position: 'absolute', top: '-4px', right: '-8px' }}
        >
          3
        </Badge>
      </div>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <span style={{ fontSize: '1.5rem' }}>🔔</span>
        <Badge 
          variant="solid" 
          color="primary" 
          size="sm"
          style={{ position: 'absolute', top: '-4px', right: '-8px' }}
        >
          12
        </Badge>
      </div>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <span style={{ fontSize: '1.5rem' }}>🛒</span>
        <Badge 
          variant="solid" 
          color="success" 
          size="sm"
          style={{ position: 'absolute', top: '-4px', right: '-8px' }}
        >
          5
        </Badge>
      </div>
    </div>
  )
}
