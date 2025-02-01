import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MasonryGrid from '../MasonryGrid'

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
  }
]

describe('MasonryGrid', () => {
  it('renders items', () => {
    const { getAllByRole } = render(
      <MasonryGrid items={sampleItems} />
    )
    expect(getAllByRole('img')).toHaveLength(2)
  })

  it('shows loading skeleton', () => {
    const { container } = render(
      <MasonryGrid items={sampleItems} loading={true} />
    )
    expect(container.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(6)
  })

  it('handles item click', () => {
    const onItemClick = jest.fn()
    const { getAllByRole } = render(
      <MasonryGrid
        items={sampleItems}
        onItemClick={onItemClick}
      />
    )

    fireEvent.click(getAllByRole('img')[0])
    expect(onItemClick).toHaveBeenCalledWith(sampleItems[0], 0)
  })

  it('renders custom content', () => {
    const { getByText } = render(
      <MasonryGrid
        items={sampleItems}
        renderContent={(item, index) => (
          <div>Content {index + 1}</div>
        )}
      />
    )

    expect(getByText('Content 1')).toBeInTheDocument()
    expect(getByText('Content 2')).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const { container } = render(
      <MasonryGrid
        items={sampleItems}
        customStyles="padding: 40px;"
      />
    )
    expect(container.firstChild).toHaveStyle({
      padding: '40px'
    })
  })
})
