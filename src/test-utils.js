import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// Default theme for testing
const defaultTheme = {
  colors: {
    primary: '#7162e8',
    danger: '#dc3545',
    gray: {
      100: '#f8f9fa',
      300: '#dee2e6',
      400: '#ced4da',
      700: '#495057'
    }
  },
  typography: {
    fontSizes: {
      sm: '0.875rem',
      md: '1rem'
    }
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem'
  }
}

export const renderWithTheme = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  )

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired
  }

  return render(ui, { wrapper: Wrapper, ...options })
}
