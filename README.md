# Swigg Component Library

> A modern React component library built with styled-components

[![NPM](https://img.shields.io/npm/v/swigg.svg)](https://www.npmjs.com/package/swigg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install --save swigg
```

## Components

### Button
A flexible button component with hover effects and customizable styles.

```jsx
import { Button } from 'swigg'

const Example = () => (
  <Button
    bgOverlay="#7162e8"
    customStyles="max-width: 200px;"
    onClick={() => console.log('clicked')}
  >
    Click Me
  </Button>
)
```

### MainNav
A responsive navigation component with mobile support and sticky positioning.

```jsx
import { MainNav } from 'swigg'

const Example = () => (
  <MainNav
    bg="#f8f8f8"
    fontColor="slateblue"
    breakPoint="900px"
    isSticky={true}
    logo={{
      url: '/logo.png',
      alt: "Company Logo"
    }}
  >
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </MainNav>
)
```

### AutoGrid
A responsive grid layout that automatically adjusts columns based on container width.

```jsx
import { AutoGrid } from 'swigg'

const Example = () => (
  <AutoGrid
    bg="#f5f5f5"
    minWidth="250px"
    spacing="25px"
    padding="25px"
  >
    {/* Grid items */}
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </AutoGrid>
)
```

### Gallery
A responsive image gallery with optional click callbacks.

```jsx
import { Gallery } from 'swigg'

const Example = () => (
  <Gallery
    bg="#fcfcfc"
    padding="45px"
    spacing="25px"
    colSize="350px"
    items={[
      {
        image: "/image1.jpg",
        clickCallback: () => console.log('Image 1 clicked')
      },
      {
        image: "/image2.jpg"
      }
    ]}
  />
)
```

### Skeleton
Loading placeholder components with shimmer effect.

```jsx
import { Skeleton, ProductSkeleton, CardSkeleton } from 'swigg'

// Basic skeleton
const LoadingText = () => (
  <Skeleton
    width="200px"
    height="20px"
    borderRadius="4px"
  />
)

// Pre-built product card skeleton
const LoadingProduct = () => (
  <ProductSkeleton
    width="300px"
    padding="20px"
  />
)

// Pre-built card skeleton
const LoadingCard = () => (
  <CardSkeleton
    width="300px"
    padding="20px"
  />
)
```

Available skeleton templates:
- ProductSkeleton
- CardSkeleton
- BlogPostSkeleton
- CartItemSkeleton
- ProfileSkeleton

## Props

### Button Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bgOverlay | string | '#7162e8' | Background color |
| customStyles | string | '' | Additional CSS styles |
| children | node | required | Button content |
| onClick | function | undefined | Click handler |

### MainNav Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bg | string | '#fff' | Background color |
| fontColor | string | '#333' | Text color |
| breakPoint | string | '800px' | Mobile breakpoint |
| isSticky | boolean | false | Enable sticky positioning |
| logo | object | required | Logo configuration |

### AutoGrid Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| minWidth | string | '350px' | Minimum column width |
| spacing | string | '25px' | Gap between items |
| padding | string | '25px' | Grid padding |
| bg | string | 'white' | Background color |
| customStyles | string | '' | Additional CSS styles |

### Skeleton Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | string | '100%' | Element width |
| height | string | '20px' | Element height |
| borderRadius | string | '4px' | Border radius |
| margin | string | '0' | Margin |
| baseColor | string | '#eeeeee' | Base color |
| highlightColor | string | '#f5f5f5' | Shimmer color |
| circle | boolean | false | Circular shape |
| customStyles | string | '' | Additional CSS styles |

## License

MIT © [raymondware](https://github.com/raymondware)

## Setup

Wrap your app with the ThemeProvider:
