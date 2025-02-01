import React from 'react'
import { fn } from '@storybook/test'
import { Checkbox, FormGroup } from '../../components/form-components'

const meta = {
  title: 'Form Components/Checkbox',
  component: Checkbox,
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

// Template with state management for controlled checkbox
const ControlledTemplate = (args) => {
  const [isChecked, setIsChecked] = React.useState(args.checked || false)
  
  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    args.onChange(e)
  }

  return <Checkbox {...args} checked={isChecked} onChange={handleChange} />
}

export const Default = ControlledTemplate.bind({})
Default.args = {
  label: 'Accept terms and conditions',
  onChange: fn()
}

export const Checked = ControlledTemplate.bind({})
Checked.args = {
  label: 'Checked checkbox',
  checked: true,
  onChange: fn()
}

export const WithError = ControlledTemplate.bind({})
WithError.args = {
  label: 'Required checkbox',
  error: 'This field is required',
  onChange: fn()
}

export const Disabled = ControlledTemplate.bind({})
Disabled.args = {
  label: 'Disabled checkbox',
  disabled: true,
  onChange: fn()
}

export const DisabledChecked = ControlledTemplate.bind({})
DisabledChecked.args = {
  label: 'Disabled checked checkbox',
  disabled: true,
  checked: true,
  onChange: fn()
}

// Example of checkbox group
export const CheckboxGroup = () => {
  const [selected, setSelected] = React.useState([])

  const handleChange = (e) => {
    const { checked, name } = e.target
    setSelected(prev => 
      checked 
        ? [...prev, name]
        : prev.filter(item => item !== name)
    )
  }

  return (
    <FormGroup legend="Select your interests">
      <Checkbox
        label="Frontend Development"
        name="frontend"
        checked={selected.includes('frontend')}
        onChange={handleChange}
      />
      <Checkbox
        label="Backend Development"
        name="backend"
        checked={selected.includes('backend')}
        onChange={handleChange}
      />
      <Checkbox
        label="DevOps"
        name="devops"
        checked={selected.includes('devops')}
        onChange={handleChange}
      />
      <Checkbox
        label="UI/UX Design"
        name="design"
        checked={selected.includes('design')}
        onChange={handleChange}
      />
    </FormGroup>
  )
} 