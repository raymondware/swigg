import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Textarea from '../Textarea'

describe('Textarea', () => {
  it('renders with label', () => {
    const { getByText, getByRole } = render(
      <Textarea label="Message" />
    )
    expect(getByText('Message')).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Textarea onChange={handleChange} />
    )

    fireEvent.change(getByRole('textbox'), {
      target: { value: 'test message' }
    })
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows error message', () => {
    const { getByText } = render(
      <Textarea error="This field is required" />
    )
    expect(getByText('This field is required')).toBeInTheDocument()
  })

  it('applies custom height', () => {
    const { getByRole } = render(
      <Textarea minHeight="200px" />
    )
    expect(getByRole('textbox')).toHaveStyle({
      minHeight: '200px'
    })
  })

  it('applies resize property', () => {
    const { getByRole } = render(
      <Textarea resize="none" />
    )
    expect(getByRole('textbox')).toHaveStyle({
      resize: 'none'
    })
  })

  it('can be disabled', () => {
    const { getByRole } = render(
      <Textarea disabled />
    )
    expect(getByRole('textbox')).toBeDisabled()
  })
})
