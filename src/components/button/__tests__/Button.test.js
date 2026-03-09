import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  // Basic rendering
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as a button by default', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('can render as a different element', () => {
      render(<Button as="a" href="#">Link</Button>)
      expect(screen.getByRole('link')).toBeInTheDocument()
    })
  })

  // Variants
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      const { container } = render(<Button>Primary</Button>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it.each(['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'])(
      'renders %s variant without errors',
      (variant) => {
        render(<Button variant={variant}>{variant}</Button>)
        expect(screen.getByText(variant)).toBeInTheDocument()
      }
    )
  })

  // Sizes
  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'])(
      'renders %s size without errors',
      (size) => {
        render(<Button size={size}>{size}</Button>)
        expect(screen.getByText(size)).toBeInTheDocument()
      }
    )
  })

  // States
  describe('States', () => {
    it('handles click events', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByText('Click me'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not fire click when disabled', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      
      fireEvent.click(screen.getByText('Disabled'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('shows disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows loading state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toBeDisabled()
    })

    it('does not fire click when loading', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick} loading>Loading</Button>)
      
      fireEvent.click(screen.getByText('Loading'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  // Icons
  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Button iconLeft={<span data-testid="icon-left">←</span>}>Back</Button>)
      expect(screen.getByTestId('icon-left')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      render(<Button iconRight={<span data-testid="icon-right">→</span>}>Next</Button>)
      expect(screen.getByTestId('icon-right')).toBeInTheDocument()
    })

    it('hides icons when loading', () => {
      render(
        <Button 
          loading 
          iconLeft={<span data-testid="icon-left">←</span>}
        >
          Loading
        </Button>
      )
      expect(screen.queryByTestId('icon-left')).not.toBeInTheDocument()
    })
  })

  // Full width
  describe('Full Width', () => {
    it('renders full width button', () => {
      const { container } = render(<Button fullWidth>Full</Button>)
      expect(container.firstChild).toHaveStyle({ width: '100%' })
    })
  })

  // Accessibility
  describe('Accessibility', () => {
    it('has correct type attribute', () => {
      render(<Button>Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('supports custom type', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('is focusable', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('is not focusable when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })
})
