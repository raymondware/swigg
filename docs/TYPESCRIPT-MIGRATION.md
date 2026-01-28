# TypeScript Migration Guide

This document tracks the TypeScript migration of the Swigg component library.

## Overview

Swigg is being incrementally migrated to TypeScript. The project supports mixed .js and .tsx files during the transition.

## Setup

TypeScript has been configured with:
- `tsconfig.json` - Strict mode enabled, JSX support
- `ts-loader` added to webpack pipeline
- Type definitions for React and styled-components

## Migration Pattern

When converting a component to TypeScript:

1. **Create interface for props**
   ```typescript
   export interface ComponentProps {
     /** Description for JSDoc */
     propName?: string
   }
   ```

2. **Use transient props for styled-components** (prefix with `$`)
   ```typescript
   interface StyledProps {
     $width: string
     $active: boolean
   }
   
   const Styled = styled.div<StyledProps>`
     width: ${props => props.$width};
   `
   ```

3. **Convert the component**
   ```typescript
   const Component: React.FC<ComponentProps> = ({
     propName = 'default',
     ...props
   }) => {
     return <div {...props} />
   }
   ```

4. **Rename file** from `.js` to `.tsx`

5. **Remove PropTypes** (TypeScript replaces them)

6. **Update exports** to include types

## Migration Status

### Completed ✅

**Form Components:**
- [x] Skeleton
- [x] Button (with ButtonProps, ButtonVariant types)
- [x] Input (with InputProps type)
- [x] Select (with SelectProps, SelectOption types)
- [x] Textarea (with TextareaProps, TextareaResize types)
- [x] Checkbox (with CheckboxProps type)
- [x] Radio (with RadioProps type)
- [x] FormGroup (with FormGroupProps type)

**Dialog/Overlay:**
- [x] Modal (with ModalProps, Escape key handling, body scroll lock)

**Multi-Select:**
- [x] MultiSelect (with MultiSelectProps, MultiSelectItem, MultiSelectRef types)

**Layout Components:**
- [x] AutoGrid (with AutoGridProps type)
- [x] MasonryGrid (with MasonryGridProps, MasonryItem types)
- [x] Gallery (with GalleryProps, GalleryItem types)

*(continued below)*

**Navigation:**
- [x] MainNav (with MainNavProps, MainNavLogo, SlideDirection types)

**Media:**
- [x] LazyImage (with LazyImageProps type)

**Cards:**
- [x] ProjectCard (with ProjectCardProps, OverlayProps types)

**16 components migrated!** 🎉

### Not Yet Migrated
- [ ] Hooks (useClickOutside, etc.)
- [ ] Themes
- [ ] Stories (can remain .js for now)
- [ ] Tests

## Type Export Strategy

Once migration is complete, types will be exported via:
- `dist/types/index.d.ts` - Auto-generated declarations
- Named exports from component files

## Running Type Check

```bash
npm run typecheck
```

Note: During migration, expect errors from non-converted files. Focus on ensuring converted components pass type check.
