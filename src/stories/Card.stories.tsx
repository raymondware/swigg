import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, CardImage, Button, Badge } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat']
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg']
    },
    clickable: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '320px' }}>
      <CardHeader>
        <h3 style={{ margin: 0 }}>Card Title</h3>
      </CardHeader>
      <CardBody>
        <p>This is a basic card with header, body, and footer sections.</p>
      </CardBody>
      <CardFooter align="right">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  )
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '320px' }}>
      <CardBody>
        <h3 style={{ margin: '0 0 0.5rem' }}>Elevated Card</h3>
        <p>This card has a shadow and lifts on hover.</p>
      </CardBody>
    </Card>
  )
}

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ maxWidth: '320px' }}>
      <CardBody>
        <h3 style={{ margin: '0 0 0.5rem' }}>Outlined Card</h3>
        <p>This card has a subtle border instead of a shadow.</p>
      </CardBody>
    </Card>
  )
}

export const Flat: Story = {
  render: () => (
    <Card variant="flat" style={{ maxWidth: '320px' }}>
      <CardBody>
        <h3 style={{ margin: '0 0 0.5rem' }}>Flat Card</h3>
        <p>This card has a flat background with no shadow or border.</p>
      </CardBody>
    </Card>
  )
}

export const WithImage: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '320px' }}>
      <CardImage
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=200&fit=crop"
        alt="Landscape"
        height="180px"
      />
      <CardBody>
        <h3 style={{ margin: '0 0 0.5rem' }}>Card with Image</h3>
        <p>This card includes an image at the top.</p>
      </CardBody>
    </Card>
  )
}

export const WithHeaderAction: Story = {
  render: () => (
    <Card variant="outlined" style={{ maxWidth: '360px' }}>
      <CardHeader action={<Badge color="success">Active</Badge>}>
        <h3 style={{ margin: 0 }}>Project Status</h3>
      </CardHeader>
      <CardBody>
        <p>This card has an action element in the header area.</p>
      </CardBody>
    </Card>
  )
}

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card 
        variant="outlined" 
        clickable 
        onClick={() => alert('Card clicked!')}
        style={{ maxWidth: '200px' }}
      >
        <CardBody>
          <h4 style={{ margin: '0 0 0.5rem' }}>Click me</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>This card is clickable</p>
        </CardBody>
      </Card>
      <Card 
        variant="outlined" 
        clickable 
        onClick={() => alert('Another card clicked!')}
        style={{ maxWidth: '200px' }}
      >
        <CardBody>
          <h4 style={{ margin: '0 0 0.5rem' }}>Me too</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Click to interact</p>
        </CardBody>
      </Card>
    </div>
  )
}

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '280px' }}>
      <CardImage
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        alt="Headphones"
        height="200px"
      />
      <CardBody>
        <Badge color="warning" variant="subtle" style={{ marginBottom: '0.5rem' }}>Sale</Badge>
        <h3 style={{ margin: '0 0 0.25rem' }}>Wireless Headphones</h3>
        <p style={{ margin: '0 0 0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>High-quality sound</p>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '1.25rem' }}>$79.99 <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '0.875rem' }}>$99.99</span></p>
      </CardBody>
      <CardFooter>
        <Button fullWidth>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}

export const UserProfileCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '320px', textAlign: 'center' }}>
      <CardBody>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#7162e8', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '1.5rem',
          margin: '0 auto 1rem'
        }}>
          JD
        </div>
        <h3 style={{ margin: '0 0 0.25rem' }}>John Doe</h3>
        <p style={{ margin: '0 0 1rem', color: '#6b7280' }}>Software Engineer</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div>
            <div style={{ fontWeight: 600 }}>42</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Posts</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>1.2k</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>300</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Following</div>
          </div>
        </div>
      </CardBody>
      <CardFooter align="center">
        <Button variant="outline" size="sm">Follow</Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  )
}
