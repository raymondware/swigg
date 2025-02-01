import React from 'react'
import LazyImage from '../components/lazyImage/LazyImage'

const meta = {
  title: 'Components/LazyImage',
  component: LazyImage,
  tags: ['autodocs']
}

export default meta

const Template = args => <LazyImage {...args} />

export const Default = Template.bind({})
Default.args = {
  src: 'https://picsum.photos/800/400',
  alt: 'Random image',
  width: '100%',
  aspectRatio: '16/9'
}

export const CustomSize = Template.bind({})
CustomSize.args = {
  src: 'https://picsum.photos/400/400',
  alt: 'Square image',
  width: '200px',
  aspectRatio: '1/1'
}

export const CustomSkeleton = Template.bind({})
CustomSkeleton.args = {
  src: 'https://picsum.photos/800/400',
  alt: 'Image with custom skeleton',
  width: '100%',
  aspectRatio: '16/9',
  skeletonProps: {
    baseColor: '#e0e0e0',
    highlightColor: '#f5f5f5'
  }
}

export const CustomBorderRadius = Template.bind({})
CustomBorderRadius.args = {
  src: 'https://picsum.photos/800/400',
  alt: 'Image with custom border radius',
  width: '100%',
  aspectRatio: '16/9',
  style: {
    borderRadius: '16px'
  }
}

// Example with multiple images to demonstrate lazy loading
export const LazyLoadGrid = () => (
  <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
    {Array.from({ length: 12 }).map((_, index) => (
      <LazyImage
        key={index}
        src={`https://picsum.photos/400/300?random=${index}`}
        alt={`Random image ${index + 1}`}
        aspectRatio="4/3"
      />
    ))}
  </div>
)
