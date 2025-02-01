import React from 'react';
import { MasonryGrid } from '../components';

const meta = {
  title: 'Components/MasonryGrid',
  component: MasonryGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of columns in the grid'
    },
    hoverEffect: {
      control: 'boolean',
      description: 'Enable hover effects on items'
    },
    animate: {
      control: 'boolean',
      description: 'Enable animation when items appear'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton state'
    }
  }
};

export default meta;

const Template = args => <MasonryGrid {...args} />;

// Sample items for the stories
const sampleItems = [
  {
    image: 'https://picsum.photos/400/600?random=1',
    alt: 'Sample image 1',
    aspectRatio: '150%'
  },
  {
    image: 'https://picsum.photos/400/400?random=2',
    alt: 'Sample image 2',
    aspectRatio: '100%'
  },
  {
    image: 'https://picsum.photos/400/300?random=3',
    alt: 'Sample image 3',
    aspectRatio: '75%'
  },
  {
    image: 'https://picsum.photos/400/500?random=4',
    alt: 'Sample image 4',
    aspectRatio: '125%'
  },
  {
    image: 'https://picsum.photos/400/450?random=5',
    alt: 'Sample image 5',
    aspectRatio: '112.5%'
  },
  {
    image: 'https://picsum.photos/400/350?random=6',
    alt: 'Sample image 6',
    aspectRatio: '87.5%'
  }
];

export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '15px',
  columns: 3
};

export const WithContent = Template.bind({});
WithContent.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '15px',
  columns: 3,
  renderContent: (item, index) => (
    <div style={{ padding: '15px' }}>
      <h3>Image {index + 1}</h3>
      <p>Some description text for this image</p>
    </div>
  )
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '20px',
  columns: 3,
  borderRadius: '15px',
  itemBg: '#fff',
  bg: '#f5f5f5',
  customStyles: `
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  `
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  items: sampleItems,
  loading: true,
  padding: '25px',
  spacing: '15px',
  columns: 3
};

export const NoEffects = Template.bind({});
NoEffects.args = {
  items: sampleItems,
  hoverEffect: false,
  animate: false,
  padding: '25px',
  spacing: '15px',
  columns: 3
};
