import React from 'react';
import { AutoGrid } from '../components';

const meta = {
  title: 'Components/AutoGrid',
  component: AutoGrid,
  tags: ['autodocs'],
};

export default meta;

const Template = args => <AutoGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: [
    <div key="1" style={{ background: '#eee', padding: '20px' }}>Item 1</div>,
    <div key="2" style={{ background: '#eee', padding: '20px' }}>Item 2</div>,
    <div key="3" style={{ background: '#eee', padding: '20px' }}>Item 3</div>,
  ],
  padding: '25px',
  spacing: '25px',
  minWidth: '150px',
};

export const CustomGrid = Template.bind({});
CustomGrid.args = {
  children: [
    <div key="1" style={{ background: '#ddd', padding: '40px' }}>Large Item</div>,
    <div key="2" style={{ background: '#ddd', padding: '40px' }}>Large Item</div>,
    <div key="3" style={{ background: '#ddd', padding: '40px' }}>Large Item</div>,
    <div key="4" style={{ background: '#ddd', padding: '40px' }}>Large Item</div>,
  ],
  padding: '40px',
  spacing: '40px',
  minWidth: '250px',
  bg: '#f5f5f5',
};
