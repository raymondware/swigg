# Swigg Component Library

> A modern React component library built with styled-components and TypeScript

[![NPM](https://img.shields.io/npm/v/swigg.svg)](https://www.npmjs.com/package/swigg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Documentation

- **📚 [Storybook](https://raymondware.github.io/swigg/)** — Interactive component playground
- **🤖 [CLAUDE.md](./CLAUDE.md)** — AI-friendly documentation with props tables and examples

## Installation

```bash
npm install --save swigg styled-components
```

## Quick Start

```tsx
import { Button, Card, Input, Modal } from 'swigg'
import { ThemeProvider } from 'styled-components'

// Optional: Custom theme
const theme = {
  colors: {
    primary: '#7162e8',
    primaryHover: '#5a4dd1'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary" size="md">
        Click Me
      </Button>
    </ThemeProvider>
  )
}
```

## Components (22)

### Forms
- **Button** — 6 variants, 3 sizes, loading state, icons
- **Input** — Text input with label, error, helpText, sizes
- **Textarea** — Character count, auto-resize
- **Dropdown** — Enhanced select with search, multi-select, groups
- **Checkbox** / **Radio** — Form controls with labels
- **Select** / **MultiSelect** — Native select components

### Feedback
- **Modal** — Dialog with sizes (sm/md/lg/fullscreen), header/body/footer
- **Alert** — Info/success/warning/error banners, dismissible
- **Toast** — Toast notifications
- **Tooltip** — 4 positions, hover/click/focus triggers
- **Badge** / **Tag** — Status indicators, dismissible labels
- **Skeleton** — Loading placeholders with variants

### Layout
- **Card** — Elevated/outlined/flat variants with image support
- **AutoGrid** — Responsive auto-fit grid
- **Tabs** — Underline/boxed/pills variants
- **Avatar** / **AvatarGroup** — User avatars with status
- **MainNav** — Responsive navigation
- **Gallery** / **MasonryGrid** — Image layouts

## Example Usage

### Button
```tsx
import { Button } from 'swigg'

<Button variant="primary" size="md">Save</Button>
<Button variant="destructive" loading>Processing...</Button>
<Button iconLeft={<SaveIcon />}>Save Changes</Button>
```

### Card with Image
```tsx
import { Card, CardHeader, CardBody, CardImage, Badge } from 'swigg'

<Card variant="elevated">
  <CardImage src="/image.jpg" alt="Product" />
  <CardHeader>
    <h3>Product Name</h3>
  </CardHeader>
  <CardBody>
    <Badge color="success">In Stock</Badge>
    <p>$29.99</p>
  </CardBody>
</Card>
```

### Modal
```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'swigg'

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader><h2>Confirm</h2></ModalHeader>
  <ModalBody>Are you sure?</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

### Form
```tsx
import { Input, Textarea, Button } from 'swigg'

<Input
  label="Email"
  type="email"
  helpText="We'll never share your email"
  required
/>

<Textarea
  label="Message"
  maxLength={500}
  showCharacterCount
  autoResize
/>

<Button type="submit">Send</Button>
```

## TypeScript

All component props are exported:

```tsx
import type { ButtonProps, ModalProps, CardVariant } from 'swigg'
```

## License

MIT © [raymondware](https://github.com/raymondware)
