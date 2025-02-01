import React from 'react'
import { Button } from '../components'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    }
  }
}

export default meta

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
  variant: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary'
}

export const CustomBackground = Template.bind({})
CustomBackground.args = {
  children: 'Custom Background',
  bgOverlay: '#1ea7fd'
}

export const CustomMaxWidth = Template.bind({})
CustomMaxWidth.args = {
  children: 'Custom Max Width',
  customStyles: 'max-width: 200px;'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  children: 'Full Width Button',
  customStyles: 'max-width: 100%;'
}

export const WithHoverStyles = Template.bind({})
WithHoverStyles.args = {
  children: 'Hover Me',
  customStyles: `
    &:hover {
      background: #333;
      color: white;
    }
  `
}

export const Interactive = Template.bind({})
Interactive.args = {
  children: 'Click Me',
  onClick: () => console.log('clicked')
}
