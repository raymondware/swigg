import React from 'react'
import { fn } from '@storybook/test'
import { Textarea } from '../../components/form-components'

const meta = {
  title: 'Form Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both']
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

const Template = args => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Message',
  placeholder: 'Enter your message here',
  onChange: fn()
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Message',
  placeholder: 'Enter your message',
  error: 'Please enter at least 20 characters',
  onChange: fn()
}

export const CustomHeight = Template.bind({})
CustomHeight.args = {
  label: 'Large Message',
  placeholder: 'Enter a detailed message',
  minHeight: '200px',
  onChange: fn()
}

export const NoResize = Template.bind({})
NoResize.args = {
  label: 'Fixed Size',
  placeholder: 'This textarea cannot be resized',
  resize: 'none',
  onChange: fn()
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Textarea',
  placeholder: 'This textarea is disabled',
  disabled: true,
  value: 'This content cannot be edited',
  onChange: fn()
}
