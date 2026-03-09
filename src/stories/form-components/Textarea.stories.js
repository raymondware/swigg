import React, { useState } from 'react'
import { fn } from '@storybook/test'
import { Textarea } from '../../components/form-components'

const meta = {
  title: 'Form Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant'
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior'
    },
    disabled: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Show character count'
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-resize to fit content'
    }
  }
}

export default meta

const Template = args => <Textarea {...args} />

// Controlled component for interactive demos
const ControlledTemplate = args => {
  const [value, setValue] = useState(args.value || '')
  return (
    <Textarea 
      {...args} 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Message',
  placeholder: 'Enter your message here',
  onChange: fn()
}

// Size variants
export const Small = Template.bind({})
Small.args = {
  label: 'Small Textarea',
  placeholder: 'Compact textarea',
  size: 'sm',
  onChange: fn()
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium Textarea',
  placeholder: 'Default size textarea',
  size: 'md',
  onChange: fn()
}

export const Large = Template.bind({})
Large.args = {
  label: 'Large Textarea',
  placeholder: 'Larger textarea',
  size: 'lg',
  onChange: fn()
}

// All sizes comparison
export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Textarea size="sm" label="Small" placeholder="Small textarea" />
    <Textarea size="md" label="Medium" placeholder="Medium textarea" />
    <Textarea size="lg" label="Large" placeholder="Large textarea" />
  </div>
)
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparison of all three size variants'
    }
  }
}

// Help text
export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: 'Bio',
  placeholder: 'Tell us about yourself',
  helpText: 'Write a brief description (2-3 sentences)',
  onChange: fn()
}

// Required field
export const Required = Template.bind({})
Required.args = {
  label: 'Feedback',
  placeholder: 'Your feedback is important to us',
  required: true,
  helpText: 'Required field',
  onChange: fn()
}

// Error state
export const WithError = Template.bind({})
WithError.args = {
  label: 'Message',
  placeholder: 'Enter your message',
  error: 'Please enter at least 20 characters',
  onChange: fn()
}

// Character count
export const WithCharacterCount = ControlledTemplate.bind({})
WithCharacterCount.args = {
  label: 'Tweet',
  placeholder: 'What\'s happening?',
  showCharacterCount: true,
  maxLength: 280,
  helpText: 'Keep it under 280 characters'
}
WithCharacterCount.parameters = {
  docs: {
    description: {
      story: 'Shows character count with optional maxLength limit'
    }
  }
}

// Character count without limit
export const CharacterCountNoLimit = ControlledTemplate.bind({})
CharacterCountNoLimit.args = {
  label: 'Notes',
  placeholder: 'Add your notes here',
  showCharacterCount: true,
  helpText: 'Character count shown, no limit'
}

// Auto-resize
export const AutoResize = ControlledTemplate.bind({})
AutoResize.args = {
  label: 'Auto-expanding Textarea',
  placeholder: 'This textarea grows as you type...',
  autoResize: true,
  helpText: 'Try typing multiple lines!'
}
AutoResize.parameters = {
  docs: {
    description: {
      story: 'Textarea automatically expands to fit content'
    }
  }
}

// Custom height
export const CustomHeight = Template.bind({})
CustomHeight.args = {
  label: 'Large Message',
  placeholder: 'Enter a detailed message',
  minHeight: '200px',
  onChange: fn()
}

// No resize
export const NoResize = Template.bind({})
NoResize.args = {
  label: 'Fixed Size',
  placeholder: 'This textarea cannot be resized',
  resize: 'none',
  onChange: fn()
}

// Disabled
export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Textarea',
  placeholder: 'This textarea is disabled',
  disabled: true,
  defaultValue: 'This content cannot be edited',
  onChange: fn()
}

// All features combined
export const AllFeatures = ControlledTemplate.bind({})
AllFeatures.args = {
  label: 'Description',
  placeholder: 'Enter your description',
  size: 'lg',
  required: true,
  helpText: 'Be descriptive but concise',
  showCharacterCount: true,
  maxLength: 500,
  autoResize: true
}
AllFeatures.parameters = {
  docs: {
    description: {
      story: 'Showcasing multiple features: large size, required, help text, character count, and auto-resize'
    }
  }
}

// Form example
export const FormExample = () => (
  <form style={{ maxWidth: '500px' }}>
    <Textarea
      name="subject"
      label="Subject"
      placeholder="What's this about?"
      size="sm"
      required
    />
    <Textarea
      name="message"
      label="Message"
      placeholder="Write your message here..."
      size="md"
      required
      helpText="Please be as detailed as possible"
    />
    <Textarea
      name="notes"
      label="Additional Notes"
      placeholder="Any additional information (optional)"
      size="md"
      showCharacterCount
      maxLength={200}
    />
  </form>
)
FormExample.parameters = {
  docs: {
    description: {
      story: 'Example of multiple textareas in a form context'
    }
  }
}
