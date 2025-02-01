import React from 'react';
import { MasonryGrid } from '../components';

const meta = {
  title: 'Components/MasonryGrid',
  component: MasonryGrid,
  tags: ['autodocs'],
};

export default meta;

const Template = args => <MasonryGrid {...args} />;

// Sample items for the grid
const sampleItems = [
  {
    image: 'https://picsum.photos/400/300?random=1',
    clickCallback: () => console.log('Image 1 clicked')
  },
  {
    image: 'https://picsum.photos/400/500?random=2',
    clickCallback: () => console.log('Image 2 clicked')
  },
  {
    image: 'https://picsum.photos/400/400?random=3',
    clickCallback: () => console.log('Image 3 clicked')
  },
  {
    image: 'https://picsum.photos/400/600?random=4',
    clickCallback: () => console.log('Image 4 clicked')
  },
  {
    image: 'https://picsum.photos/400/350?random=5',
    clickCallback: () => console.log('Image 5 clicked')
  },
  {
    image: 'https://picsum.photos/400/450?random=6',
    clickCallback: () => console.log('Image 6 clicked')
  }
];

export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '15px',
  colSize: '250px',
};

export const CustomSpacing = Template.bind({});
CustomSpacing.args = {
  items: sampleItems,
  padding: '40px',
  spacing: '30px',
  colSize: '300px',
};

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '15px',
  colSize: '250px',
  bg: '#f5f5f5',
};

export const LargerColumns = Template.bind({});
LargerColumns.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '20px',
  colSize: '400px',
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  items: sampleItems,
  padding: '25px',
  spacing: '15px',
  colSize: '250px',
  customStyles: `
    background: linear-gradient(to bottom, #f5f5f5, #e5e5e5);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `,
};

export const DenseGrid = Template.bind({});
DenseGrid.args = {
  items: [
    ...sampleItems,
    ...sampleItems.map((item, index) => ({
      ...item,
      image: `https://picsum.photos/400/${300 + index * 50}?random=${index + 7}`
    }))
  ],
  padding: '20px',
  spacing: '10px',
  colSize: '200px',
};

export const NoClickCallbacks = Template.bind({});
NoClickCallbacks.args = {
  items: sampleItems.map(({ image }) => ({ image })),
  padding: '25px',
  spacing: '15px',
  colSize: '250px',
};
