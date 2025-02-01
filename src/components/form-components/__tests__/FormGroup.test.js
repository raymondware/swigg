import React from 'react'
import { render } from '@testing-library/react'
import FormGroup from '../FormGroup'
import Input from '../Input'

describe('FormGroup', () => {
  it('renders with legend', () => {
    const { getByText } = render(
      <FormGroup legend="Personal Information">
        <Input label="Name" />
      </FormGroup>
    )
    expect(getByText('Personal Information')).toBeInTheDocument()
  })

  it('renders children components', () => {
    const { getByLabelText } = render(
      <FormGroup legend="Contact">
        <Input label="Email" />
        <Input label="Phone" />
      </FormGroup>
    )
    expect(getByLabelText('Email')).toBeInTheDocument()
    expect(getByLabelText('Phone')).toBeInTheDocument()
  })

  it('shows error message', () => {
    const { getByText } = render(
      <FormGroup
        legend="Form"
        error="Please fill all required fields"
      >
        <Input label="Name" />
      </FormGroup>
    )
    expect(getByText('Please fill all required fields')).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const { container } = render(
      <FormGroup
        legend="Styled Form"
        customStyles="padding: 20px;"
      >
        <Input label="Name" />
      </FormGroup>
    )
    expect(container.firstChild).toHaveStyle({
      padding: '20px'
    })
  })
})
