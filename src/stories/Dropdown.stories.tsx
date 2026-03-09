import React, { useState } from 'react'
import { Dropdown } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    searchable: {
      control: 'boolean'
    },
    multiple: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

const basicOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' }
]

const groupedOptions = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'go', label: 'Go', group: 'Backend' }
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select a framework..."
          label="Framework"
        />
      </div>
    )
  }
}

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          searchable
          placeholder="Search frameworks..."
          label="Framework (Searchable)"
          helpText="Type to filter options"
        />
      </div>
    )
  }
}

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([])
    return (
      <div style={{ width: '350px' }}>
        <Dropdown
          options={basicOptions}
          value={values}
          onChange={(v) => setValues(v as string[])}
          multiple
          searchable
          placeholder="Select frameworks..."
          label="Technologies"
          helpText="Select multiple options"
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Selected: {values.length > 0 ? values.join(', ') : 'None'}
        </p>
      </div>
    )
  }
}

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          options={groupedOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          searchable
          placeholder="Select a technology..."
          label="Technology"
        />
      </div>
    )
  }
}

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select..."
          label="Required Field"
          error="This field is required"
        />
      </div>
    )
  }
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Dropdown
        options={basicOptions}
        value="react"
        disabled
        placeholder="Select..."
        label="Disabled Select"
      />
    </div>
  )
}

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({ sm: '', md: '', lg: '' })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <Dropdown
          options={basicOptions}
          value={values.sm}
          onChange={(v) => setValues({ ...values, sm: v as string })}
          size="sm"
          label="Small"
        />
        <Dropdown
          options={basicOptions}
          value={values.md}
          onChange={(v) => setValues({ ...values, md: v as string })}
          size="md"
          label="Medium"
        />
        <Dropdown
          options={basicOptions}
          value={values.lg}
          onChange={(v) => setValues({ ...values, lg: v as string })}
          size="lg"
          label="Large"
        />
      </div>
    )
  }
}

export const CustomRendering: Story = {
  render: () => {
    const options = [
      { value: 'react', label: 'React', data: { icon: '⚛️', desc: 'A JavaScript library' } },
      { value: 'vue', label: 'Vue', data: { icon: '💚', desc: 'The Progressive Framework' } },
      { value: 'angular', label: 'Angular', data: { icon: '🅰️', desc: 'Platform for web apps' } }
    ]
    const [value, setValue] = useState('')
    
    return (
      <div style={{ width: '350px' }}>
        <Dropdown
          options={options}
          value={value}
          onChange={(v) => setValue(v as string)}
          label="With Custom Options"
          renderOption={(opt) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{(opt.data as any).icon}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{opt.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{(opt.data as any).desc}</div>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}
