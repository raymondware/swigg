import React from 'react'
import { fn } from '@storybook/test'
import { Radio, FormGroup } from '../../components/form-components'

const meta = {
  title: 'Form Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    }
  }
}

export default meta

// Template with state management for controlled radio
const ControlledTemplate = (args) => {
  const [isChecked, setIsChecked] = React.useState(args.checked || false)

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    args.onChange(e)
  }

  return <Radio {...args} checked={isChecked} onChange={handleChange} />
}

export const Default = ControlledTemplate.bind({})
Default.args = {
  label: 'Select this option',
  name: 'demo',
  value: 'option1',
  onChange: fn()
}

export const Checked = ControlledTemplate.bind({})
Checked.args = {
  label: 'Selected radio',
  name: 'demo',
  value: 'option1',
  checked: true,
  onChange: fn()
}

export const WithError = ControlledTemplate.bind({})
WithError.args = {
  label: 'Invalid option',
  name: 'demo',
  value: 'option1',
  error: 'Please select a valid option',
  onChange: fn()
}

export const Disabled = ControlledTemplate.bind({})
Disabled.args = {
  label: 'Disabled radio',
  name: 'demo',
  value: 'option1',
  disabled: true,
  onChange: fn()
}

// Example of radio group
export const RadioGroup = () => {
  const [selected, setSelected] = React.useState('')

  const handleChange = (e) => {
    const { checked, value } = e.target
    setSelected(checked ? value : '')
  }

  return (
    <FormGroup legend="Select your preferred framework">
      <Radio
        label="React"
        name="framework"
        value="react"
        checked={selected === 'react'}
        onChange={handleChange}
      />
      <Radio
        label="Vue"
        name="framework"
        value="vue"
        checked={selected === 'vue'}
        onChange={handleChange}
      />
      <Radio
        label="Angular"
        name="framework"
        value="angular"
        checked={selected === 'angular'}
        onChange={handleChange}
      />
      <Radio
        label="Svelte"
        name="framework"
        value="svelte"
        checked={selected === 'svelte'}
        onChange={handleChange}
      />
    </FormGroup>
  )
}
