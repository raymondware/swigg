import React from 'react'
import { Gallery } from '../components'

const meta = {
  title: 'Components/Gallery',
  component: Gallery,
  tags: ['autodocs']
}

export default meta

const Template = args => <Gallery {...args} />

// Sample images for the stories
const sampleImages = [
  {
    image: 'https://picsum.photos/400/300?random=1',
    clickCallback: () => console.log('Image 1 clicked')
  },
  {
    image: 'https://picsum.photos/400/300?random=2',
    clickCallback: () => console.log('Image 2 clicked')
  },
  {
    image: 'https://picsum.photos/400/300?random=3',
    clickCallback: () => console.log('Image 3 clicked')
  },
  {
    image: 'https://picsum.photos/400/300?random=4',
    clickCallback: () => console.log('Image 4 clicked')
  }
]

export const Default = Template.bind({})
Default.args = {
  items: sampleImages,
  padding: '25px',
  spacing: '15px',
  colSize: '250px'
}

export const LargerGrid = Template.bind({})
LargerGrid.args = {
  items: sampleImages,
  padding: '40px',
  spacing: '25px',
  colSize: '350px'
}

export const CustomBackground = Template.bind({})
CustomBackground.args = {
  items: sampleImages,
  padding: '25px',
  spacing: '15px',
  colSize: '250px',
  bg: '#f5f5f5'
}

export const NoClickCallbacks = Template.bind({})
NoClickCallbacks.args = {
  items: sampleImages.map(({ image }) => ({ image })), // Remove clickCallbacks
  padding: '25px',
  spacing: '15px',
  colSize: '250px'
}

export const SingleColumn = Template.bind({})
SingleColumn.args = {
  items: sampleImages.slice(0, 2), // Only show 2 images
  padding: '25px',
  spacing: '15px',
  colSize: '100%' // Force single column
}
