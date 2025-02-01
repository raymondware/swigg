import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithTheme } from '../../../test-utils'
import Radio from '../Radio'

describe('Radio', () => {
  it('renders with label', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Radio label="Option 1" name="test" value="1" data-testid="radio-input" />
    )
    expect(getByText('Option 1')).toBeInTheDocument()
    expect(getByTestId('radio-input')).toBeInTheDocument()
  })

  it('handles change events', () => {
    const handleChange = jest.fn()
    const { getByTestId } = renderWithTheme(
      <Radio
        label="Option 1"
        name="test"
        value="1"
        onChange={handleChange}
        data-testid="radio-input"
      />
    )

    fireEvent.click(getByTestId('radio-input'))
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
          name: 'test',
          value: '1'
        })
      })
    )
  })

  it('can be checked', () => {
    const { getByTestId } = renderWithTheme(
      <Radio
        label="Option 1"
        name="test"
        value="1"
        checked={true}
        data-testid="radio-input"
      />
    )
    expect(getByTestId('radio-input')).toBeChecked()
  })

  it('shows error state', () => {
    const { getByText } = renderWithTheme(
      <Radio
        label="Option 1"
        name="test"
        value="1"
        error="Please select an option"
      />
    )
    expect(getByText('Option 1')).toHaveStyle({
      color: '#dc3545'
    })
  })

  it('can be disabled', () => {
    const handleChange = jest.fn()
    const { getByTestId } = renderWithTheme(
      <Radio
        label="Option 1"
        name="test"
        value="1"
        disabled
        onChange={handleChange}
        data-testid="radio-input"
      />
    )

    fireEvent.click(getByTestId('radio-input'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
