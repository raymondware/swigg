import React, { useState, useRef, useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'

export type TabVariant = 'underline' | 'boxed' | 'pills'

export interface TabItem {
  /** Unique key for the tab */
  key: string
  /** Tab label */
  label: React.ReactNode
  /** Tab panel content */
  content: React.ReactNode
  /** Optional icon */
  icon?: React.ReactNode
  /** Whether the tab is disabled */
  disabled?: boolean
}

export interface TabsProps {
  /** Array of tab items */
  tabs: TabItem[]
  /** Currently active tab key (controlled mode) */
  activeKey?: string
  /** Default active tab key (uncontrolled mode) */
  defaultActiveKey?: string
  /** Callback when tab changes */
  onChange?: (key: string) => void
  /** Visual variant */
  variant?: TabVariant
  /** Full width tabs */
  fullWidth?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Lazy render panel content (only renders active panel) */
  lazy?: boolean
  /** Additional class name */
  className?: string
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

interface TabButtonProps {
  $active: boolean
  $disabled: boolean
  $variant: TabVariant
  $size: 'sm' | 'md' | 'lg'
  $fullWidth: boolean
}

interface TabListProps {
  $variant: TabVariant
  $orientation: 'horizontal' | 'vertical'
}

interface TabPanelProps {
  $active: boolean
}

const sizes = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
  `
}

const variantStyles = {
  underline: {
    list: css`
      border-bottom: 2px solid #e5e7eb;
      gap: 0;
    `,
    tab: (active: boolean) => css`
      background: transparent;
      border: none;
      border-bottom: 2px solid ${active ? '#7162e8' : 'transparent'};
      margin-bottom: -2px;
      border-radius: 0;
      color: ${active ? '#7162e8' : '#6b7280'};
      
      &:hover:not(:disabled) {
        color: #7162e8;
        border-bottom-color: ${active ? '#7162e8' : '#d1d5db'};
      }
    `
  },
  boxed: {
    list: css`
      background: #f3f4f6;
      border-radius: 8px;
      padding: 4px;
      gap: 4px;
    `,
    tab: (active: boolean) => css`
      background: ${active ? 'white' : 'transparent'};
      border: none;
      border-radius: 6px;
      color: ${active ? '#111827' : '#6b7280'};
      box-shadow: ${active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
      
      &:hover:not(:disabled) {
        background: ${active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
      }
    `
  },
  pills: {
    list: css`
      gap: 0.5rem;
    `,
    tab: (active: boolean) => css`
      background: ${active ? '#7162e8' : 'transparent'};
      color: ${active ? 'white' : '#6b7280'};
      border: none;
      border-radius: 9999px;
      
      &:hover:not(:disabled) {
        background: ${active ? '#5a4dd1' : 'rgba(113, 98, 232, 0.1)'};
        color: ${active ? 'white' : '#7162e8'};
      }
    `
  }
}

const Container = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'row' : 'column'};
  width: 100%;
`

const TabList = styled.div<TabListProps>`
  display: flex;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'column' : 'row'};
  ${props => variantStyles[props.$variant].list}
  
  ${props => props.$orientation === 'vertical' && css`
    border-bottom: none;
    border-right: 2px solid #e5e7eb;
    min-width: 200px;
  `}
`

const TabButton = styled.button<TabButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;
  
  ${props => sizes[props.$size]}
  ${props => variantStyles[props.$variant].tab(props.$active)}
  
  ${props => props.$fullWidth && css`
    flex: 1;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid #7162e8;
    outline-offset: 2px;
  }
`

const TabPanel = styled.div<TabPanelProps>`
  padding: 1rem 0;
  display: ${props => props.$active ? 'block' : 'none'};
  animation: ${props => props.$active ? 'fadeIn 0.2s ease' : 'none'};
  flex: 1;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const TabIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.25em;
`

/**
 * Tabs component with support for multiple variants, controlled/uncontrolled modes,
 * icons, disabled states, and lazy panel rendering.
 * 
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { key: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { key: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, icon: <Icon /> },
 *     { key: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true }
 *   ]}
 *   variant="pills"
 *   defaultActiveKey="tab1"
 * />
 * ```
 */
const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = 'underline',
  fullWidth = false,
  size = 'md',
  lazy = true,
  className,
  orientation = 'horizontal'
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || (tabs[0]?.key ?? '')
  )
  
  // Track which panels have been rendered (for lazy mode)
  const renderedPanels = useRef<Set<string>>(new Set([internalActiveKey]))
  
  // Determine if controlled or uncontrolled
  const isControlled = activeKey !== undefined
  const currentKey = isControlled ? activeKey : internalActiveKey
  
  // Handle tab click
  const handleTabClick = useCallback((key: string) => {
    if (!isControlled) {
      setInternalActiveKey(key)
    }
    renderedPanels.current.add(key)
    onChange?.(key)
  }, [isControlled, onChange])
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const enabledTabs = tabs.filter(t => !t.disabled)
    const currentEnabledIndex = enabledTabs.findIndex(t => t.key === tabs[index].key)
    
    let newIndex: number | null = null
    
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') {
        newIndex = (currentEnabledIndex + 1) % enabledTabs.length
      } else if (e.key === 'ArrowLeft') {
        newIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1
      }
    } else {
      if (e.key === 'ArrowDown') {
        newIndex = (currentEnabledIndex + 1) % enabledTabs.length
      } else if (e.key === 'ArrowUp') {
        newIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1
      }
    }
    
    if (e.key === 'Home') {
      newIndex = 0
    } else if (e.key === 'End') {
      newIndex = enabledTabs.length - 1
    }
    
    if (newIndex !== null) {
      e.preventDefault()
      const newTab = enabledTabs[newIndex]
      handleTabClick(newTab.key)
      // Focus the new tab button
      const tabButton = document.querySelector(`[data-tab-key="${newTab.key}"]`) as HTMLButtonElement
      tabButton?.focus()
    }
  }, [tabs, orientation, handleTabClick])
  
  // Memoize rendered panels for lazy mode
  const shouldRenderPanel = useCallback((key: string) => {
    if (!lazy) return true
    return key === currentKey || renderedPanels.current.has(key)
  }, [lazy, currentKey])

  return (
    <Container className={className} $orientation={orientation}>
      <TabList 
        role="tablist" 
        $variant={variant}
        $orientation={orientation}
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.key}
            role="tab"
            data-tab-key={tab.key}
            $active={tab.key === currentKey}
            $disabled={tab.disabled || false}
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-selected={tab.key === currentKey}
            aria-controls={`panel-${tab.key}`}
            tabIndex={tab.key === currentKey ? 0 : -1}
          >
            {tab.icon && <TabIcon>{tab.icon}</TabIcon>}
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      
      {tabs.map(tab => (
        <TabPanel
          key={tab.key}
          id={`panel-${tab.key}`}
          role="tabpanel"
          $active={tab.key === currentKey}
          aria-labelledby={`tab-${tab.key}`}
          hidden={tab.key !== currentKey}
        >
          {shouldRenderPanel(tab.key) && tab.content}
        </TabPanel>
      ))}
    </Container>
  )
}

Tabs.displayName = 'Tabs'

export default Tabs
