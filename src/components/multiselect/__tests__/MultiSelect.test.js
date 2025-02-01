import React from 'react'
import { fireEvent, act, waitFor } from '@testing-library/react'
import { renderWithTheme } from '../../../test-utils'
import MultiSelect from '../MultiSelect'

const sampleItems = [
  { id: 1, label: 'React' },
  { id: 2, label: 'Vue' },
  { id: 3, label: 'Angular' }
]

describe.skip('MultiSelect', () => {
  it('renders with label', () => {
    const { getByText } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
      />
    )
    expect(getByText('Select Framework')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const { getByRole, findByText } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
      />
    )

    const combobox = getByRole('combobox')

    await act(async () => {
      fireEvent.click(combobox)
    })

    const reactOption = await findByText('React')
    const vueOption = await findByText('Vue')
    const angularOption = await findByText('Angular')

    expect(reactOption).toBeVisible()
    expect(vueOption).toBeVisible()
    expect(angularOption).toBeVisible()
  })

  it('handles item selection', async () => {
    const handleChange = jest.fn()
    const { getByRole, findByText } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
        onSelectionChange={handleChange}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('combobox'))
    })

    const option = await findByText('React')
    fireEvent.click(option)

    expect(handleChange).toHaveBeenCalledWith([sampleItems[0]])
  })

  it('shows initial selection', () => {
    const { getByText } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
        initialSelected={[sampleItems[0], sampleItems[1]]}
      />
    )

    expect(getByText('2 selected')).toBeInTheDocument()
    expect(getByText('React, Vue')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    const { getByRole } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
        disabled
      />
    )

    const combobox = getByRole('combobox')
    expect(combobox).toHaveStyle('pointer-events: none')
    expect(combobox).toHaveStyle('opacity: 0.6')
  })

  it('closes on selection when closeOnSelect is true', async () => {
    const { getByRole, findByText, queryByText } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
        closeOnSelect={true}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('combobox'))
    })

    const option = await findByText('React')
    fireEvent.click(option)

    await waitFor(() => {
      expect(queryByText('Vue')).not.toBeVisible()
    })
  })

  it('shows action buttons when hasButton is true', async () => {
    const { getByRole, getByText, container } = renderWithTheme(
      <MultiSelect
        items={sampleItems}
        label="Select Framework"
        hasButton={true}
        buttonText="Apply"
      />
    )

    // First click to open dropdown
    const combobox = getByRole('combobox')

    // Click and wait for state update
    await act(async () => {
      fireEvent.click(combobox)
    })

    // Wait for dropdown to be visible
    await waitFor(() => {
      const dropdown = container.querySelector('[role="listbox"]')
      expect(dropdown).toHaveStyle({ display: 'block' })
    }, { timeout: 1000 })

    // Wait for items to be visible
    await waitFor(() => {
      expect(getByText('React')).toBeVisible()
    }, { timeout: 1000 })

    // Now check for buttons
    expect(getByText('Select All')).toBeVisible()
    expect(getByText('Apply')).toBeVisible()
  })
})
