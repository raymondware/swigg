import React from 'react'
import { MainNav } from '../components'

// Swigg logo with glowing effect for stories
const DEMO_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxmaWx0ZXIgaWQ9Imdvb2QiIHg9Ii04IiB5PSItOCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI2MCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQiLz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJvdmVyIi8+PC9maWx0ZXI+PGxpbmVhckdyYWRpZW50IGlkPSJnbG93IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmYTUwMDtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmNjYwMDtzdG9wLW9wYWNpdHk6MSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMTExMTEiIHJ4PSI4Ii8+PHRleHQgeD0iNjAiIHk9IjI0IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNnbG93KSIgZmlsdGVyPSJ1cmwoI2dvb2QpIj5Td2lnZzwvdGV4dD48L3N2Zz4='

const meta = {
  title: 'Components/MainNav',
  component: MainNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

// Sample navigation items
const defaultNav = (
  <ul>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/services">Services</a>
    <a href="/contact">Contact</a>
  </ul>
)

const Template = args => (
  <MainNav {...args}>
    {defaultNav}
  </MainNav>
)

export const Default = Template.bind({})
Default.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  }
}

export const CustomColors = Template.bind({})
CustomColors.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  bg: '#1a1a1a',
  fontColor: '#ffffff'
}

export const WithBorder = Template.bind({})
WithBorder.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  showBorder: true
}

export const CustomBreakpoint = Template.bind({})
CustomBreakpoint.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  breakPoint: '1024px'
}

export const WithActiveLink = Template.bind({})
WithActiveLink.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  activeLink: '/about'
}

export const CustomLogoSize = Template.bind({})
CustomLogoSize.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  logoHeight: '50px',
  stickyLogoHeight: '35px'
}

export const BottomSlideMenu = Template.bind({})
BottomSlideMenu.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  slideDirection: 'bottom'
}

export const StickyNav = Template.bind({})
StickyNav.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  isSticky: true,
  showBorder: true
}

// Example with menu toggle callback
export const WithMenuCallback = Template.bind({})
WithMenuCallback.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  onMenuToggle: (isOpen) => console.log('Menu is', isOpen ? 'open' : 'closed')
}

// Example with custom max width
export const CustomWidth = Template.bind({})
CustomWidth.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  maxWidth: '960px'
}

// Example with custom styles
export const CustomStyles = Template.bind({})
CustomStyles.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  customStyles: `
    background: linear-gradient(to right, #7162e8, #5d4ee5);
    
    a {
      color: white !important;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }
    }
  `
}

// Example with all features combined
export const FullFeatured = Template.bind({})
FullFeatured.args = {
  logo: {
    url: DEMO_LOGO,
    alt: 'Demo Logo'
  },
  isSticky: true,
  showBorder: true,
  maxWidth: '1100px',
  logoHeight: '45px',
  stickyLogoHeight: '35px',
  activeLink: '/services',
  slideDirection: 'top',
  onMenuToggle: (isOpen) => console.log('Menu is', isOpen ? 'open' : 'closed'),
  closeOnScroll: true
}
