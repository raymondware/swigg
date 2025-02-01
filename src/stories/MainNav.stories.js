import React from 'react';
import { MainNav } from '../components';

const meta = {
  title: 'Components/MainNav',
  component: MainNav,
  tags: ['autodocs'],
};

export default meta;

const Template = args => <MainNav {...args} />;

// Sample logo for stories
const logo = {
  url: 'https://via.placeholder.com/150x50?text=Logo',
  alt: 'Company Logo'
};

// Sample navigation items
const defaultNav = (
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
);

export const Default = Template.bind({});
Default.args = {
  logo: logo,
  children: defaultNav,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  logo: logo,
  children: defaultNav,
  bg: '#1a1a1a',
  fontColor: '#ffffff',
};

export const CustomBreakpoint = Template.bind({});
CustomBreakpoint.args = {
  logo: logo,
  children: defaultNav,
  breakPoint: '1200px',
};

export const Sticky = Template.bind({});
Sticky.args = {
  logo: logo,
  children: defaultNav,
  isSticky: true,
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  logo: logo,
  children: defaultNav,
  bg: '#f8f9fa',
  fontColor: '#333',
  customStyles: `
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    ul li a {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.9em;

      &:hover {
        color: #007bff;
      }
    }
  `,
};

export const WithLongMenu = Template.bind({});
WithLongMenu.args = {
  logo: logo,
  children: (
    <ul>
      {Array.from({ length: 8 }, (_, i) => (
        <li key={i}><a href="#">Menu Item {i + 1}</a></li>
      ))}
    </ul>
  ),
  breakPoint: '1100px',
};
