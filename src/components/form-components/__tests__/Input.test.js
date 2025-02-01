import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from '../Input'

describe('Input', () => {
  it('renders with label', () => {
    const { getByText, getByRole } = render(
      <Input label="Username" name="username" />
    )
    expect(getByText('Username')).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Input onChange={handleChange} />
    )

    fireEvent.change(getByRole('textbox'), {
      target: { value: 'test' }
    })
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows error message', () => {
    const { getByText } = render(
      <Input error="This field is required" />
    )
    expect(getByText('This field is required')).toBeInTheDocument()
  })

  it('applies error styles', () => {
    const { getByRole } = render(
      <Input error="Error" />
    )
    expect(getByRole('textbox')).toHaveStyle({
      borderColor: '#dc3545'
    })
  })

  it('can be disabled', () => {
    const { getByRole } = render(
      <Input disabled />
    )
    expect(getByRole('textbox')).toBeDisabled()
  })

  it('applies custom styles', () => {
    const { container } = render(
      <Input customStyles="max-width: 200px;" />
    )
    expect(container.querySelector('input')).toHaveStyle({
      maxWidth: '200px'
    })
  })
})
