import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    )

    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>)
    expect(container.firstChild).toHaveStyle({
      background: '#7162e8'
    })
  })

  it('renders secondary variant', () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>
    )
    expect(container.firstChild).toHaveStyle({
      background: 'rgba(113, 98, 232, 0.1)',
      border: '2px solid #7162e8'
    })
  })

  it('applies custom background color', () => {
    const { container } = render(
      <Button bgOverlay="#ff0000">Custom</Button>
    )
    expect(container.firstChild).toHaveStyle({
      background: '#ff0000'
    })
  })

  it('applies custom styles', () => {
    const { container } = render(
      <Button customStyles="max-width: 200px;">Custom</Button>
    )
    expect(container.firstChild).toHaveStyle({
      maxWidth: '200px'
    })
  })
})
