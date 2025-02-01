import React from 'react'
import { Input } from '../../components/form-components'

const meta = {
  title: 'Form Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel']
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

const Template = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username'
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
  error: 'Please enter a valid email address'
}

export const Password = Template.bind({})
Password.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'This input is disabled',
  disabled: true
}

export const Required = Template.bind({})
Required.args = {
  label: 'Required Field',
  placeholder: 'This field is required',
  required: true
}

export const CustomStyles = Template.bind({})
CustomStyles.args = {
  label: 'Custom Styled Input',
  placeholder: 'Enter text',
  customStyles: `
    border-radius: 999px;
    border-color: #7162e8;
    &:focus {
      border-color: #7162e8;
      box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.2);
    }
  `
}
