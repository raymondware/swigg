import { fn } from '@storybook/test';
import { Button } from '../components/button';

export default {
  title: 'Components/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
    onClick: fn(),
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    onClick: fn(),
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
    onClick: fn(),
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
    onClick: fn(),
  },
};
