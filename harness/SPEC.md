# Swigg Design System — Full Build Harness

## Objective
Transform Swigg from a basic component library into a full-fledged design system with:
1. All pending PRs merged
2. Storybook deployed to GitHub Pages
3. Complete component set
4. AI-friendly documentation

## Current State
- **Tech:** React + styled-components + Storybook
- **Version:** 0.2.8 (npm published)
- **5 Open PRs:**
  1. `feat/button-enhancements` — variants, sizes, loading, icons
  2. `feat/form-enhancements` — size variants, helpText, a11y
  3. `feat/textarea-enhancements` — size variants, char count, auto-resize
  4. `feat/toast-component` — Toast and ToastContainer
  5. `feat/typescript-foundation` — TS + Skeleton migration

## Goals

### Phase 1: Merge PRs
- Merge PRs in dependency order
- Resolve any conflicts
- Verify builds pass

### Phase 2: GitHub Pages + Storybook
- Configure GitHub Actions for Storybook deploy
- Deploy to GitHub Pages
- Add design tokens documentation

### Phase 3: Expand Components
Add components to make it a complete design system:
- Modal/Dialog
- Dropdown/Select
- Tabs
- Card
- Badge/Tag
- Avatar
- Tooltip
- Alert/Banner
- Skeleton loaders
- Data table (basic)

### Phase 4: AI-Friendly Docs
- CLAUDE.md with component inventory and usage patterns
- Props tables in markdown (easy for AI to parse)
- Copy-paste examples for each component
- Design token reference

## Constraints
- All commits as "Raymond Ware <ray@raymondware.com>"
- Keep styled-components pattern
- Maintain Storybook stories for all components
- Export everything from main index
- Mobile-first responsive

## Success Criteria
- [ ] All 5 PRs merged
- [ ] Storybook live on GitHub Pages
- [ ] 15+ total components
- [ ] CLAUDE.md with AI integration guide
- [ ] npm version bumped and ready to publish
