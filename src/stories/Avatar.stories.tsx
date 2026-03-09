import React from 'react'
import { Avatar, AvatarGroup } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away', undefined]
    },
    rounded: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    alt: 'User avatar',
    size: 'md'
  }
}

export const WithFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="John Doe" size="lg" />
      <Avatar name="Jane Smith" size="lg" />
      <Avatar name="Alice" size="lg" />
      <Avatar size="lg" /> {/* Shows ? */}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  )
}

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          size="lg" 
          status="online"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Online</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          size="lg" 
          status="away"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Away</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
          size="lg" 
          status="busy"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Busy</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          name="John Doe"
          size="lg" 
          status="offline"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>Offline</div>
      </div>
    </div>
  )
}

export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="Circle" size="lg" rounded={false} />
      <Avatar name="Rounded" size="lg" rounded={true} />
    </div>
  )
}

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Default (max 4)</p>
        <AvatarGroup>
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
          <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
          <Avatar name="John Doe" />
          <Avatar name="Jane Smith" />
          <Avatar name="Bob Wilson" />
        </AvatarGroup>
      </div>
      
      <div>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Large size</p>
        <AvatarGroup size="lg">
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
          <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
        </AvatarGroup>
      </div>
      
      <div>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Tight spacing</p>
        <AvatarGroup spacing="tight">
          <Avatar name="A" />
          <Avatar name="B" />
          <Avatar name="C" />
          <Avatar name="D" />
        </AvatarGroup>
      </div>
    </div>
  )
}

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        size="lg"
        onClick={() => alert('Avatar clicked!')}
      />
      <span style={{ color: '#6b7280' }}>← Click the avatar</span>
    </div>
  )
}

export const CustomFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar 
        size="lg" 
        fallback={<span style={{ fontSize: '1.25rem' }}>👤</span>}
      />
      <Avatar 
        size="lg" 
        fallback={<span style={{ fontSize: '1.25rem' }}>🎭</span>}
      />
    </div>
  )
}

export const UserList: Story = {
  render: () => {
    const users = [
      { name: 'John Doe', role: 'Admin', status: 'online' as const, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { name: 'Jane Smith', role: 'Editor', status: 'away' as const, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { name: 'Bob Wilson', role: 'Viewer', status: 'offline' as const }
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {users.map(user => (
          <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
            <Avatar 
              src={user.img}
              name={user.name}
              size="md"
              status={user.status}
            />
            <div>
              <div style={{ fontWeight: 500 }}>{user.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.role}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
