import React from 'react'
import { fn } from '@storybook/test'
import { MultiSelect } from '../components'

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    isEditable: {
      control: 'boolean',
      description: 'Whether the select can be opened by clicking the input'
    },
    hasButton: {
      control: 'boolean',
      description: 'Show action buttons when open'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select'
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when an item is selected'
    },
    onSelectionChange: {
      description: 'Callback fired when selection changes'
    }
  }
}

export default meta

// Sample items for stories
const sampleItems = [
  { id: 1, label: 'React' },
  { id: 2, label: 'Vue' },
  { id: 3, label: 'Angular' },
  { id: 4, label: 'Svelte' },
  { id: 5, label: 'Next.js' },
  { id: 6, label: 'Nuxt.js' },
  { id: 7, label: 'Gatsby' },
  { id: 8, label: 'Remix' }
]

const Template = args => <MultiSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  onSelectionChange: fn()
}

export const WithInitialSelection = Template.bind({})
WithInitialSelection.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  initialSelected: [sampleItems[0], sampleItems[1]],
  onSelectionChange: fn()
}

export const NoButtons = Template.bind({})
NoButtons.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  hasButton: false,
  onSelectionChange: fn()
}

export const CustomButton = Template.bind({})
CustomButton.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  buttonText: 'Apply',
  onSelectionChange: fn()
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  isEditable: false,
  initialSelected: [sampleItems[0], sampleItems[1]],
  onSelectionChange: fn()
}

export const WithCallback = Template.bind({})
WithCallback.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  onSelectionChange: fn((selected) => console.log('Selected items:', selected))
}

// Example with custom styling
export const CustomStyling = Template.bind({})
CustomStyling.args = {
  items: sampleItems,
  label: 'Select Frameworks',
  className: 'custom-select',
  itemClassName: 'custom-item',
  selectedItemClassName: 'custom-selected-item',
  onSelectionChange: fn()
}

export const StayOpenOnSelect = Template.bind({})
StayOpenOnSelect.args = {
  items: sampleItems,
  label: 'Select Multiple Items',
  closeOnSelect: false,
  onSelectionChange: fn()
}

export const CloseOnSelect = Template.bind({})
CloseOnSelect.args = {
  items: sampleItems,
  label: 'Select One at a Time',
  closeOnSelect: true,
  onSelectionChange: fn()
}
