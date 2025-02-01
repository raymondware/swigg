import React from 'react';
import { fn } from '@storybook/test';
import { Button } from '../components';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button',
};

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  children: 'Custom Background',
  bgOverlay: '#1ea7fd',
};

export const CustomMaxWidth = Template.bind({});
CustomMaxWidth.args = {
  children: 'Custom Max Width',
  customStyles: 'max-width: 200px;',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Full Width Button',
  customStyles: 'max-width: 100%;',
};

export const WithHoverStyles = Template.bind({});
WithHoverStyles.args = {
  children: 'Hover Me',
  customStyles: `
    &:hover {
      background: #333;
      color: white;
    }
  `,
};

export const Interactive = Template.bind({});
Interactive.args = {
  children: 'Click Me',
  onClick: fn(),
};
