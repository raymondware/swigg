# Swigg Component Library — AI Integration Guide

> Modern React component library built with styled-components and TypeScript

## Quick Start

```bash
npm install swigg styled-components
```

```tsx
import { Button, Card, Input, Modal } from 'swigg'
import { ThemeProvider } from 'styled-components'

// Optional: Custom theme
const theme = {
  colors: {
    primary: '#7162e8',
    primaryHover: '#5a4dd1',
    error: '#dc2626'
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

---

## Component Inventory (22 Components)

### Forms
| Component | Description |
|-----------|-------------|
| `Button` | Flexible button with 6 variants, 3 sizes, loading state, icons |
| `Input` | Text input with label, error, helpText, sizes |
| `Textarea` | Multi-line input with character count, auto-resize |
| `Select` | Native select dropdown (form-components) |
| `Checkbox` | Checkbox with label and error state |
| `Radio` | Radio button with label |
| `FormGroup` | Form field wrapper |
| `Dropdown` | Enhanced select with search, multi-select, groups |
| `MultiSelect` | Multi-value select component |

### Feedback
| Component | Description |
|-----------|-------------|
| `Modal` | Dialog overlay with sizes, header/body/footer |
| `Toast` | Toast notification |
| `ToastContainer` | Container for toast positioning |
| `Alert` | Alert banner with 4 variants, dismissible |
| `Tooltip` | Tooltip with positions, triggers |
| `Badge` | Status indicator with colors, dot variant |
| `Tag` | Dismissible label with icon support |
| `Skeleton` | Loading placeholder with shimmer effect |

### Layout
| Component | Description |
|-----------|-------------|
| `Card` | Container with header/body/footer/image |
| `AutoGrid` | Responsive auto-fit grid |
| `MasonryGrid` | Masonry-style grid layout |
| `Gallery` | Image gallery with click callbacks |
| `MainNav` | Responsive navigation with mobile menu |

### Data Display
| Component | Description |
|-----------|-------------|
| `Tabs` | Tabbed interface with 3 variants |
| `Avatar` | User avatar with image/initials fallback |
| `AvatarGroup` | Stacked avatars with overflow |
| `LazyImage` | Lazy-loaded image |
| `ProjectCard` | Project showcase card |

---

## Component Reference

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Button content |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' \| 'destructive'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `fullWidth` | `boolean` | `false` | Full width button |
| `iconLeft` | `ReactNode` | — | Icon on left |
| `iconRight` | `ReactNode` | — | Icon on right |
| `as` | `ElementType` | `'button'` | Render as different element |

```tsx
import { Button } from 'swigg'

// Primary button
<Button variant="primary" size="md">Save</Button>

// Loading state
<Button loading>Processing...</Button>

// With icon
<Button iconLeft={<SaveIcon />}>Save Changes</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// As link
<Button as="a" href="/page" variant="link">Learn More</Button>
```

---

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text above input |
| `error` | `string` | — | Error message |
| `helpText` | `string` | — | Help text below input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `required` | `boolean` | `false` | Mark as required |
| `showRequiredIndicator` | `boolean` | `true` | Show asterisk for required |

```tsx
import { Input } from 'swigg'

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helpText="We'll never share your email"
  required
/>

// With error
<Input
  label="Username"
  error="Username is already taken"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

---

### Textarea

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `error` | `string` | — | Error message |
| `helpText` | `string` | — | Help text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior |
| `showCharacterCount` | `boolean` | `false` | Show character count |
| `autoResize` | `boolean` | `false` | Auto-grow with content |
| `maxLength` | `number` | — | Maximum characters |

```tsx
import { Textarea } from 'swigg'

<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={500}
  showCharacterCount
  autoResize
/>
```

---

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Whether modal is open |
| `onClose` | `() => void` | required | Close callback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'fullscreen'` | `'md'` | Modal size |
| `maxWidth` | `string` | — | Custom max width |
| `showCloseButton` | `boolean` | `true` | Show X button |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key |

**Sub-components:** `ModalHeader`, `ModalBody`, `ModalFooter`

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'swigg'

const [isOpen, setIsOpen] = useState(false)

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
  <ModalHeader>
    <h2>Confirm Action</h2>
  </ModalHeader>
  <ModalBody>
    <p>Are you sure you want to continue?</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

### Dropdown (Enhanced Select)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | required | Array of options |
| `value` | `string \| string[]` | — | Selected value(s) |
| `onChange` | `(value) => void` | — | Change callback |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `searchable` | `boolean` | `false` | Enable search/filter |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `disabled` | `boolean` | `false` | Disable select |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `label` | `string` | — | Label text |
| `error` | `string` | — | Error message |
| `maxHeight` | `string` | `'300px'` | Max dropdown height |

```tsx
import { Dropdown } from 'swigg'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte', label: 'Svelte', group: 'Newer' }
]

// Single select with search
<Dropdown
  label="Framework"
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
/>

// Multi-select
<Dropdown
  label="Technologies"
  options={options}
  value={selectedItems}
  onChange={setSelectedItems}
  multiple
  searchable
/>
```

---

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | required | Tab definitions |
| `activeKey` | `string` | — | Controlled active tab |
| `defaultActiveKey` | `string` | — | Uncontrolled default |
| `onChange` | `(key) => void` | — | Tab change callback |
| `variant` | `'underline' \| 'boxed' \| 'pills'` | `'underline'` | Visual variant |
| `fullWidth` | `boolean` | `false` | Full width tabs |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `lazy` | `boolean` | `true` | Lazy render panels |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab orientation |

```tsx
import { Tabs } from 'swigg'

<Tabs
  variant="pills"
  tabs={[
    { key: 'overview', label: 'Overview', content: <OverviewPanel /> },
    { key: 'details', label: 'Details', icon: <InfoIcon />, content: <DetailsPanel /> },
    { key: 'settings', label: 'Settings', content: <SettingsPanel />, disabled: true }
  ]}
  defaultActiveKey="overview"
  onChange={(key) => console.log('Tab changed:', key)}
/>
```

---

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual style |
| `clickable` | `boolean` | `false` | Make card clickable |
| `onClick` | `() => void` | — | Click handler |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Padding size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Border radius |
| `fullWidth` | `boolean` | `false` | Full width |

**Sub-components:** `CardHeader`, `CardBody`, `CardFooter`, `CardImage`

```tsx
import { Card, CardHeader, CardBody, CardFooter, CardImage, Button } from 'swigg'

<Card variant="elevated">
  <CardImage src="/image.jpg" alt="Card image" height="200px" />
  <CardHeader action={<Badge color="success">New</Badge>}>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here with any React elements.</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>

// Clickable card
<Card variant="outlined" clickable onClick={() => navigate('/item')}>
  <CardBody>Click to view details</CardBody>
</Card>
```

---

### Badge & Tag

**Badge Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outline' \| 'subtle'` | `'subtle'` | Visual style |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'gray'` | `'primary'` | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `dot` | `boolean` | `false` | Show as dot indicator |

**Tag Props:** Same as Badge, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dismissible` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | — | Close callback |
| `icon` | `ReactNode` | — | Icon element |

```tsx
import { Badge, Tag } from 'swigg'

// Status badges
<Badge color="success">Active</Badge>
<Badge color="warning" variant="outline">Pending</Badge>
<Badge color="error" dot /> {/* Dot indicator */}

// Dismissible tags
<Tag color="primary" dismissible onClose={() => removeTag('react')}>
  React
</Tag>
<Tag color="gray" icon={<FolderIcon />}>
  Category
</Tag>
```

---

### Avatar & AvatarGroup

**Avatar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text |
| `name` | `string` | — | Name for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Status indicator |
| `rounded` | `boolean` | `false` | Rounded square vs circle |
| `fallback` | `ReactNode` | — | Custom fallback element |

**AvatarGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | `4` | Max avatars to show |
| `size` | `AvatarSize` | `'md'` | Size for all avatars |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | Overlap amount |

```tsx
import { Avatar, AvatarGroup } from 'swigg'

// Single avatar with status
<Avatar
  src="/user.jpg"
  name="John Doe"
  size="lg"
  status="online"
/>

// Initials fallback
<Avatar name="Jane Smith" size="md" /> {/* Shows "JS" */}

// Avatar group with overflow
<AvatarGroup max={3} size="md">
  <Avatar src="/user1.jpg" name="User 1" />
  <Avatar src="/user2.jpg" name="User 2" />
  <Avatar name="User 3" />
  <Avatar name="User 4" />
  <Avatar name="User 5" />
</AvatarGroup>
{/* Shows 3 avatars + "+2" */}
```

---

### Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `trigger` | `'hover' \| 'click' \| 'focus'` | `'hover'` | Trigger type |
| `variant` | `'dark' \| 'light'` | `'dark'` | Visual variant |
| `arrow` | `boolean` | `true` | Show arrow |
| `showDelay` | `number` | `0` | Delay before show (ms) |
| `hideDelay` | `number` | `0` | Delay before hide (ms) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `maxWidth` | `string` | `'250px'` | Max width |

```tsx
import { Tooltip, Button } from 'swigg'

<Tooltip content="Save your changes" position="top">
  <Button>Save</Button>
</Tooltip>

// Click trigger with light variant
<Tooltip
  content={<div>Rich content with <strong>formatting</strong></div>}
  trigger="click"
  variant="light"
  position="bottom"
>
  <span>Click for info</span>
</Tooltip>
```

---

### Alert

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `title` | `ReactNode` | — | Alert title |
| `children` | `ReactNode` | required | Alert description |
| `dismissible` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | — | Close callback |
| `icon` | `ReactNode \| null` | auto | Custom icon (null to hide) |
| `action` | `ReactNode` | — | Action element |
| `banner` | `boolean` | `false` | Full-width banner style |

```tsx
import { Alert, Button } from 'swigg'

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

<Alert
  variant="warning"
  dismissible
  onClose={() => setShowAlert(false)}
  action={<Button size="sm" variant="outline">View</Button>}
>
  Please review the pending changes before continuing.
</Alert>

// Banner mode
<Alert variant="error" banner>
  System maintenance scheduled for tonight at 10 PM.
</Alert>
```

---

### Skeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'100%'` | Element width |
| `height` | `string` | `'20px'` | Element height |
| `borderRadius` | `string` | `'4px'` | Border radius |
| `circle` | `boolean` | `false` | Circular shape |
| `count` | `number` | `1` | Number of instances |
| `baseColor` | `string` | `'#eeeeee'` | Base color |
| `highlightColor` | `string` | `'#f5f5f5'` | Shimmer color |

**Variants:** `SkeletonText`, `SkeletonAvatar`, `SkeletonCard`, `SkeletonTableRow`

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTableRow
} from 'swigg'

// Basic skeleton
<Skeleton width="200px" height="20px" />
<Skeleton width="48px" height="48px" circle />

// Text lines
<SkeletonText lines={3} lastLineWidth="60%" />

// Avatar with text
<SkeletonAvatar size="lg" withText />

// Card skeleton
<SkeletonCard hasImage imageHeight="180px" lines={2} hasFooter />

// Table row
<SkeletonTableRow columns={4} />
```

---

### AutoGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minWidth` | `string` | `'350px'` | Min column width |
| `spacing` | `string` | `'25px'` | Gap between items |
| `padding` | `string` | `'25px'` | Grid padding |
| `bg` | `string` | `'white'` | Background color |

```tsx
import { AutoGrid, Card } from 'swigg'

<AutoGrid minWidth="300px" spacing="20px">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</AutoGrid>
```

---

### Checkbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `checked` | `boolean` | `false` | Checked state |
| `onChange` | `(e) => void` | — | Change handler |
| `error` | `string` | — | Error message |
| `disabled` | `boolean` | `false` | Disable checkbox |

```tsx
import { Checkbox } from 'swigg'

<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  required
/>
```

---

## Design Tokens

Swigg uses styled-components theming. Pass a theme to `ThemeProvider`:

```tsx
const theme = {
  colors: {
    primary: '#7162e8',      // Main brand color
    primaryHover: '#5a4dd1', // Primary hover state
    secondary: 'rgba(113, 98, 232, 0.1)',
    error: '#dc2626',        // Error states
    errorHover: '#b91c1c'
  }
}
```

**Default Colors:**

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#7162e8` | Buttons, links, focus rings |
| `error` | `#dc2626` | Error states, destructive |
| `success` | `#10b981` | Success alerts, badges |
| `warning` | `#f59e0b` | Warning alerts, badges |
| `info` | `#3b82f6` | Info alerts |

---

## TypeScript Types

All component props are exported:

```tsx
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  InputProps,
  ModalProps,
  TabItem,
  SelectOption,
  CardVariant,
  BadgeColor,
  AvatarSize,
  AlertVariant
} from 'swigg'
```

---

## Common Patterns

### Form with Validation

```tsx
import { Input, Textarea, Button, Alert } from 'swigg'

function ContactForm() {
  const [errors, setErrors] = useState({})

  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <Alert variant="error" dismissible>
          {errors.form}
        </Alert>
      )}

      <Input
        label="Name"
        name="name"
        error={errors.name}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        error={errors.email}
        required
      />

      <Textarea
        label="Message"
        name="message"
        error={errors.message}
        maxLength={500}
        showCharacterCount
        required
      />

      <Button type="submit" loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  )
}
```

### Modal with Form

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'swigg'

function EditModal({ isOpen, onClose, onSave }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <h2>Edit Profile</h2>
      </ModalHeader>
      <ModalBody>
        <Input label="Display Name" defaultValue={user.name} />
        <Textarea label="Bio" defaultValue={user.bio} />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </ModalFooter>
    </Modal>
  )
}
```

### Card Grid

```tsx
import { AutoGrid, Card, CardImage, CardBody, Badge } from 'swigg'

function ProductGrid({ products }) {
  return (
    <AutoGrid minWidth="280px" spacing="24px">
      {products.map(product => (
        <Card key={product.id} variant="outlined" clickable>
          <CardImage src={product.image} alt={product.name} />
          <CardBody>
            <Badge color={product.inStock ? 'success' : 'gray'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </CardBody>
        </Card>
      ))}
    </AutoGrid>
  )
}
```

### Loading States

```tsx
import { SkeletonCard, SkeletonTableRow, AutoGrid } from 'swigg'

// Card grid loading
function LoadingGrid() {
  return (
    <AutoGrid minWidth="280px">
      {[1, 2, 3, 4].map(i => (
        <SkeletonCard key={i} hasImage lines={2} />
      ))}
    </AutoGrid>
  )
}

// Table loading
function LoadingTable() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(i => (
        <SkeletonTableRow key={i} columns={4} />
      ))}
    </div>
  )
}
```

---

## Resources

- **Storybook:** https://raymondware.github.io/swigg/
- **npm:** https://www.npmjs.com/package/swigg
- **GitHub:** https://github.com/raymondware/swigg
