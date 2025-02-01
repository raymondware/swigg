import React from 'react'
import { ProjectCard } from '../components'

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the card'
    },
    animation: {
      control: 'boolean',
      description: 'Enable hover animation'
    },
    bgOverlay: {
      control: 'color',
      description: 'Background overlay color'
    }
  }
}

export default meta

const Template = args => <ProjectCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Project Title',
  bgImage: 'https://picsum.photos/400/300',
  children: 'A brief description of the project and its key features. This can include multiple lines of text to demonstrate the card layout.',
  techList: ['React', 'Node.js', 'MongoDB'],
  link: 'https://example.com',
  animation: true
}

export const WithoutAnimation = Template.bind({})
WithoutAnimation.args = {
  title: 'Static Card',
  bgImage: 'https://picsum.photos/400/300?random=2',
  children: 'This card does not animate on hover, demonstrating the static state.',
  techList: ['Vue', 'Express', 'PostgreSQL'],
  link: 'https://example.com',
  animation: false
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  title: 'Wide Card',
  maxWidth: '600px',
  bgImage: 'https://picsum.photos/600/300?random=3',
  children: 'This card demonstrates a custom width setting, making it wider than the default.',
  techList: ['Angular', 'Firebase', 'TypeScript'],
  link: 'https://example.com',
  animation: true
}

export const CustomOverlay = Template.bind({})
CustomOverlay.args = {
  title: 'Custom Overlay',
  bgImage: 'https://picsum.photos/400/300?random=4',
  bgOverlay: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  children: 'This card showcases a custom gradient overlay on the header image.',
  techList: ['Next.js', 'Prisma', 'TailwindCSS'],
  link: 'https://example.com',
  animation: true
}

export const LongContent = Template.bind({})
LongContent.args = {
  title: 'Detailed Project',
  bgImage: 'https://picsum.photos/400/300?random=5',
  children: `
    A more detailed project description that spans multiple lines.
    This example shows how the card handles longer content while
    maintaining its clean layout and readability.
  `,
  techList: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'AWS'],
  link: 'https://example.com',
  animation: true
}

export const CustomStyles = Template.bind({})
CustomStyles.args = {
  title: 'Styled Card',
  bgImage: 'https://picsum.photos/400/300?random=6',
  children: 'A project card with custom styling applied.',
  techList: ['React', 'Styled Components'],
  link: 'https://example.com',
  animation: true,
  customStyles: `
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    border: 1px solid #eaeaea;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
  `
}
