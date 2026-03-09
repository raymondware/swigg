import React from 'react'
import { Input } from '../../components/form-components'

const meta = {
  title: 'Form Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile input component with size variants, help text, and validation states.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant'
    },
    disabled: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    helpText: {
      control: 'text',
      description: 'Help text shown below input'
    },
    error: {
      control: 'text',
      description: 'Error message'
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

// Size variants
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Input size="sm" label="Small Input" placeholder="Small size" />
    <Input size="md" label="Medium Input (Default)" placeholder="Medium size" />
    <Input size="lg" label="Large Input" placeholder="Large size" />
  </div>
)

// With help text
export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
  helpText: 'We\'ll never share your email with anyone else.'
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
  placeholder: 'Enter your password',
  helpText: 'Must be at least 8 characters'
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
  required: true,
  helpText: 'This field is mandatory'
}

// Form example
export const FormExample = () => (
  <div style={{ maxWidth: '400px' }}>
    <Input
      label="Full Name"
      placeholder="John Doe"
      required
    />
    <Input
      label="Email Address"
      type="email"
      placeholder="john@example.com"
      required
      helpText="We'll use this for account notifications"
    />
    <Input
      size="lg"
      label="Phone Number"
      type="tel"
      placeholder="+1 (555) 123-4567"
      helpText="Optional - for two-factor authentication"
    />
  </div>
)

// Interactive playground
export const Playground = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    size: 'md',
    helpText: '',
    error: '',
    required: false,
    disabled: false
  }
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
