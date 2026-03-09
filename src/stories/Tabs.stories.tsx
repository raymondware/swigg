import React, { useState } from 'react'
import { Tabs } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'boxed', 'pills']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    fullWidth: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tabs>

const basicTabs = [
  { key: 'overview', label: 'Overview', content: <div><h3>Overview</h3><p>This is the overview content. It provides a general summary of the topic.</p></div> },
  { key: 'features', label: 'Features', content: <div><h3>Features</h3><ul><li>Feature one</li><li>Feature two</li><li>Feature three</li></ul></div> },
  { key: 'pricing', label: 'Pricing', content: <div><h3>Pricing</h3><p>Our pricing plans start at $9.99/month.</p></div> }
]

export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultActiveKey: 'overview'
  }
}

export const Underline: Story = {
  args: {
    tabs: basicTabs,
    variant: 'underline',
    defaultActiveKey: 'overview'
  }
}

export const Boxed: Story = {
  args: {
    tabs: basicTabs,
    variant: 'boxed',
    defaultActiveKey: 'overview'
  }
}

export const Pills: Story = {
  args: {
    tabs: basicTabs,
    variant: 'pills',
    defaultActiveKey: 'overview'
  }
}

export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    variant: 'boxed',
    fullWidth: true,
    defaultActiveKey: 'overview'
  }
}

export const WithIcons: Story = {
  args: {
    tabs: [
      { key: 'home', label: 'Home', icon: '🏠', content: <p>Home content</p> },
      { key: 'profile', label: 'Profile', icon: '👤', content: <p>Profile content</p> },
      { key: 'settings', label: 'Settings', icon: '⚙️', content: <p>Settings content</p> }
    ],
    variant: 'pills',
    defaultActiveKey: 'home'
  }
}

export const WithDisabled: Story = {
  args: {
    tabs: [
      { key: 'active', label: 'Active Tab', content: <p>This tab is active</p> },
      { key: 'disabled', label: 'Disabled Tab', content: <p>You cannot see this</p>, disabled: true },
      { key: 'another', label: 'Another Tab', content: <p>Another active tab</p> }
    ],
    variant: 'underline',
    defaultActiveKey: 'active'
  }
}

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('tab1')
    
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <p>Active tab: <strong>{activeKey}</strong></p>
          <button onClick={() => setActiveKey('tab1')} style={{ marginRight: '0.5rem' }}>Go to Tab 1</button>
          <button onClick={() => setActiveKey('tab2')} style={{ marginRight: '0.5rem' }}>Go to Tab 2</button>
          <button onClick={() => setActiveKey('tab3')}>Go to Tab 3</button>
        </div>
        <Tabs
          tabs={[
            { key: 'tab1', label: 'Tab 1', content: <p>Content for Tab 1</p> },
            { key: 'tab2', label: 'Tab 2', content: <p>Content for Tab 2</p> },
            { key: 'tab3', label: 'Tab 3', content: <p>Content for Tab 3</p> }
          ]}
          activeKey={activeKey}
          onChange={setActiveKey}
          variant="boxed"
        />
      </div>
    )
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
        <Tabs tabs={basicTabs} size="sm" variant="pills" />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Medium</h4>
        <Tabs tabs={basicTabs} size="md" variant="pills" />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
        <Tabs tabs={basicTabs} size="lg" variant="pills" />
      </div>
    </div>
  )
}

export const Vertical: Story = {
  args: {
    tabs: basicTabs,
    orientation: 'vertical',
    variant: 'underline',
    defaultActiveKey: 'overview'
  }
}
