# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-03-09

### Added
- **TypeScript support** — Full migration to TypeScript with exported prop types
- **9 new components:**
  - `Modal` — Dialog with sizes (sm/md/lg/fullscreen), ModalHeader/Body/Footer
  - `Dropdown` — Enhanced select with search, multi-select, option groups
  - `Tabs` — Tabbed interface with underline/boxed/pills variants
  - `Card` — Container with CardHeader/Body/Footer/Image sub-components
  - `Badge` — Status indicator with solid/outline/subtle variants and dot mode
  - `Tag` — Dismissible label with icon support
  - `Avatar` — User avatar with image/initials fallback and status indicators
  - `AvatarGroup` — Stacked avatars with overflow count
  - `Tooltip` — Tooltip with 4 positions and hover/click/focus triggers
  - `Alert` — Alert banner with info/success/warning/error variants
  - Skeleton variants: `SkeletonText`, `SkeletonAvatar`, `SkeletonCard`, `SkeletonTableRow`
- **Storybook documentation** — Interactive component playground on GitHub Pages
- **AI-friendly CLAUDE.md** — Comprehensive documentation for AI code assistants

### Changed
- **Button:** Added 6 variants (primary, secondary, outline, ghost, link, destructive), 3 sizes (sm, md, lg), loading state with spinner, icon support (iconLeft, iconRight)
- **Input:** Added size variants (sm, md, lg), helpText prop, improved accessibility with proper ARIA attributes
- **Textarea:** Added size variants, character count display, auto-resize mode
- **Select (form):** Added size variants, helpText support
- **Checkbox/Radio:** Improved styling and accessibility
- **Skeleton:** Enhanced base component with count prop, added shimmer animation

### Technical
- Migrated all components from JavaScript to TypeScript
- Using transient props ($variant, $size) for styled-components
- All prop interfaces exported for TypeScript consumers
- Bundle size: 133KB (CommonJS), 136KB (ESM)

## [0.2.8] - Previous Release

- Initial stable release with core components
- Button, Input, Textarea, Select, Checkbox, Radio
- AutoGrid, MasonryGrid, Gallery
- MainNav, ProjectCard, LazyImage
- Toast, Skeleton (base)
