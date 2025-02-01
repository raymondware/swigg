import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Select from '../Select'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

describe('Select', () => {
  it('renders with label', () => {
    const { getByText, getByRole } = render(
      <Select label="Choose option" options={options} />
    )
    expect(getByText('Choose option')).toBeInTheDocument()
    expect(getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all options', () => {
    const { getAllByRole } = render(
      <Select options={options} />
    )
    expect(getAllByRole('option')).toHaveLength(3)
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Select options={options} onChange={handleChange} />
    )

    fireEvent.change(getByRole('combobox'), {
      target: { value: 'option2' }
    })
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows error message', () => {
    const { getByText } = render(
      <Select
        options={options}
        error="Please select an option"
      />
    )
    expect(getByText('Please select an option')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const { getByRole } = render(
      <Select options={options} disabled />
    )
    expect(getByRole('combobox')).toBeDisabled()
  })
})
