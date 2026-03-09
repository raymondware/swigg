import React from 'react'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from '../components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    circle: {
      control: 'boolean'
    },
    borderRadius: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    width: '200px',
    height: '20px'
  }
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton width="100px" height="20px" />
      <Skeleton width="48px" height="48px" circle />
      <Skeleton width="100px" height="100px" borderRadius="8px" />
    </div>
  )
}

export const TextLines: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SkeletonText lines={4} lastLineWidth="60%" />
    </div>
  )
}

export const AvatarVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>Avatar only</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SkeletonAvatar size="xs" />
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>Avatar with text</p>
        <SkeletonAvatar size="lg" withText />
      </div>
    </div>
  )
}

export const CardVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ width: '280px' }}>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>With image</p>
        <SkeletonCard hasImage imageHeight="150px" lines={2} />
      </div>
      <div style={{ width: '280px' }}>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>With footer</p>
        <SkeletonCard hasImage={false} lines={3} hasFooter />
      </div>
      <div style={{ width: '280px' }}>
        <p style={{ marginBottom: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>Full card</p>
        <SkeletonCard hasImage imageHeight="180px" lines={2} hasFooter />
      </div>
    </div>
  )
}

export const TableRows: Story = {
  render: () => (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
      <SkeletonTableRow columns={4} />
    </div>
  )
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton count={3} width="100%" height="16px" margin="0 0 8px 0" />
    </div>
  )
}

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton width="200px" height="20px" baseColor="#e5e7eb" highlightColor="#f3f4f6" />
      <Skeleton width="200px" height="20px" baseColor="#dbeafe" highlightColor="#eff6ff" />
      <Skeleton width="200px" height="20px" baseColor="#dcfce7" highlightColor="#f0fdf4" />
    </div>
  )
}

export const UserListSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
          <SkeletonAvatar size="md" />
          <div style={{ flex: 1 }}>
            <Skeleton width="120px" height="14px" margin="0 0 8px 0" />
            <Skeleton width="80px" height="12px" />
          </div>
          <Skeleton width="60px" height="32px" borderRadius="6px" />
        </div>
      ))}
    </div>
  )
}

export const ArticleSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Skeleton width="70%" height="32px" margin="0 0 1rem 0" />
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <SkeletonAvatar size="sm" />
        <div>
          <Skeleton width="100px" height="12px" margin="0 0 4px 0" />
          <Skeleton width="80px" height="10px" />
        </div>
      </div>
      <Skeleton width="100%" height="200px" borderRadius="8px" margin="0 0 1.5rem 0" />
      <SkeletonText lines={6} />
    </div>
  )
}

export const DashboardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
          <Skeleton width="40%" height="12px" margin="0 0 0.5rem 0" />
          <Skeleton width="60%" height="28px" margin="0 0 1rem 0" />
          <Skeleton width="100%" height="60px" borderRadius="4px" />
        </div>
      ))}
    </div>
  )
}
