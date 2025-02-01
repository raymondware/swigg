import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithTheme } from '../../../test-utils'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Checkbox label="Accept terms" name="terms" data-testid="checkbox-input" />
    )
    expect(getByText('Accept terms')).toBeInTheDocument()
    expect(getByTestId('checkbox-input')).toBeInTheDocument()
  })

  it('handles change events', () => {
    const handleChange = jest.fn()
    const { getByTestId } = renderWithTheme(
      <Checkbox
        label="Accept terms"
        name="terms"
        onChange={handleChange}
        data-testid="checkbox-input"
      />
    )

    fireEvent.click(getByTestId('checkbox-input'))
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
          name: 'terms'
        })
      })
    )
  })

  it('can be checked', () => {
    const { getByTestId } = renderWithTheme(
      <Checkbox
        label="Accept terms"
        name="terms"
        checked={true}
        data-testid="checkbox-input"
      />
    )
    expect(getByTestId('checkbox-input')).toBeChecked()
  })

  it('shows error state', () => {
    const { getByText } = renderWithTheme(
      <Checkbox
        label="Accept terms"
        name="terms"
        error="This field is required"
      />
    )
    expect(getByText('This field is required')).toBeInTheDocument()
    expect(getByText('Accept terms')).toHaveStyle({
      color: '#dc3545'
    })
  })

  it('can be disabled', () => {
    const handleChange = jest.fn()
    const { getByTestId } = renderWithTheme(
      <Checkbox
        label="Accept terms"
        name="terms"
        disabled
        onChange={handleChange}
        data-testid="checkbox-input"
      />
    )

    fireEvent.click(getByTestId('checkbox-input'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
