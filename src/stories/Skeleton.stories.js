import React from 'react';
import { Skeleton } from '../components';
import {
  ProductSkeleton,
  CardSkeleton,
  BlogPostSkeleton,
  CartItemSkeleton,
  ProfileSkeleton,
} from '../components/skeleton/SkeletonTemplates';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;

const Template = args => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '200px',
  height: '20px',
};

export const Circle = Template.bind({});
Circle.args = {
  width: '50px',
  height: '50px',
  circle: true,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  width: '200px',
  height: '20px',
  baseColor: '#e0e0e0',
  highlightColor: '#f0f0f0',
};

export const Card = Template.bind({});
Card.args = {
  width: '300px',
  height: '200px',
  borderRadius: '8px',
};

export const Avatar = Template.bind({});
Avatar.args = {
  width: '40px',
  height: '40px',
  circle: true,
  margin: '0 10px',
};

// Example of multiple skeletons together
export const TextBlock = () => (
  <div style={{ width: '300px' }}>
    <Skeleton
      width="70%"
      height="20px"
      margin="0 0 10px 0"
    />
    <Skeleton
      width="100%"
      height="20px"
      margin="0 0 10px 0"
    />
    <Skeleton
      width="60%"
      height="20px"
      margin="0 0 10px 0"
    />
  </div>
);

// Example of a card layout with multiple skeletons
export const CardWithContent = () => (
  <div style={{ width: '300px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
    <Skeleton
      width="100%"
      height="200px"
      margin="0 0 15px 0"
      borderRadius="4px"
    />
    <Skeleton
      width="70%"
      height="24px"
      margin="0 0 10px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 5px 0"
    />
    <Skeleton
      width="100%"
      height="16px"
      margin="0 0 5px 0"
    />
    <Skeleton
      width="50%"
      height="16px"
    />
  </div>
);

// Template stories
export const Product = () => <ProductSkeleton />;

export const CardTemplate = () => <CardSkeleton />;

export const BlogPost = () => <BlogPostSkeleton />;

export const CartItem = () => (
  <div style={{ maxWidth: '600px', border: '1px solid #eee' }}>
    <CartItemSkeleton />
    <CartItemSkeleton />
    <CartItemSkeleton />
  </div>
);

export const Profile = () => <ProfileSkeleton />;

// Multiple templates example
export const ProductGrid = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  }}>
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
  </div>
);
