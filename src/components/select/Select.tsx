import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import styled, { css, keyframes } from 'styled-components'

export interface SelectOption {
  /** Unique value for the option */
  value: string
  /** Display label */
  label: string
  /** Whether the option is disabled */
  disabled?: boolean
  /** Optional group name for grouping */
  group?: string
  /** Additional data for custom rendering */
  data?: unknown
}

export interface SelectProps {
  /** Array of options */
  options: SelectOption[]
  /** Currently selected value(s) */
  value?: string | string[]
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void
  /** Placeholder text when nothing selected */
  placeholder?: string
  /** Enable search/filter functionality */
  searchable?: boolean
  /** Enable multi-select mode */
  multiple?: boolean
  /** Whether the select is disabled */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Help text below the select */
  helpText?: string
  /** Error message */
  error?: string
  /** Custom renderer for options */
  renderOption?: (option: SelectOption) => React.ReactNode
  /** Custom renderer for selected value(s) */
  renderValue?: (selected: SelectOption[]) => React.ReactNode
  /** Additional class name */
  className?: string
  /** Close on select (single mode only) */
  closeOnSelect?: boolean
  /** Max height of dropdown */
  maxHeight?: string
  /** Full width */
  fullWidth?: boolean
}

interface StyledSelectProps {
  $size: 'sm' | 'md' | 'lg'
  $disabled: boolean
  $error: boolean
  $isOpen: boolean
  $fullWidth: boolean
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const sizes = {
  sm: css`
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    font-size: 0.875rem;
    min-height: 36px;
  `,
  md: css`
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    font-size: 1rem;
    min-height: 44px;
  `,
  lg: css`
    padding: 1rem 3rem 1rem 1.25rem;
    font-size: 1.125rem;
    min-height: 52px;
  `
}

const Container = styled.div<{ $fullWidth: boolean }>`
  position: relative;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  min-width: 200px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: #374151;
`

const SelectButton = styled.button<StyledSelectProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 2px solid ${props => props.$error ? '#dc2626' : props.$isOpen ? '#7162e8' : '#e5e7eb'};
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  transition: all 0.2s ease;
  text-align: left;
  color: #111827;
  
  ${props => sizes[props.$size]}
  
  &:hover:not(:disabled) {
    border-color: ${props => props.$error ? '#dc2626' : '#7162e8'};
  }
  
  &:focus {
    outline: none;
    border-color: #7162e8;
    box-shadow: 0 0 0 3px rgba(113, 98, 232, 0.1);
  }
`

const Placeholder = styled.span`
  color: #9ca3af;
`

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%) ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.2s ease;
  color: #6b7280;
  pointer-events: none;
`

const Dropdown = styled.div<{ $maxHeight: string }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  overflow: hidden;
  animation: ${slideDown} 0.15s ease;
  max-height: ${props => props.$maxHeight};
  overflow-y: auto;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  outline: none;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    background: #f9fafb;
  }
`

const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem;
`

const GroupLabel = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const OptionItem = styled.li<{ $selected: boolean; $highlighted: boolean; $disabled: boolean }>`
  padding: 0.75rem 1rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  border-radius: 6px;
  margin: 2px 0;
  transition: background 0.15s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.$disabled ? 0.5 : 1};
  
  background: ${props => {
    if (props.$selected) return 'rgba(113, 98, 232, 0.1)'
    if (props.$highlighted) return '#f3f4f6'
    return 'transparent'
  }};
  
  color: ${props => props.$selected ? '#7162e8' : '#111827'};
  font-weight: ${props => props.$selected ? 500 : 400};
  
  &:hover:not([aria-disabled="true"]) {
    background: ${props => props.$selected ? 'rgba(113, 98, 232, 0.15)' : '#f3f4f6'};
  }
`

const Checkbox = styled.span<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${props => props.$checked ? '#7162e8' : '#d1d5db'};
  border-radius: 4px;
  background: ${props => props.$checked ? '#7162e8' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &::after {
    content: '${props => props.$checked ? '✓' : ''}';
    color: white;
    font-size: 12px;
  }
`

const SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  max-width: calc(100% - 2rem);
`

const Tag = styled.span`
  background: rgba(113, 98, 232, 0.1);
  color: #7162e8;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`

const TagClose = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #7162e8;
  font-size: 14px;
  line-height: 1;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`

const HelpText = styled.span<{ $error: boolean }>`
  display: block;
  margin-top: 0.375rem;
  font-size: 0.875rem;
  color: ${props => props.$error ? '#dc2626' : '#6b7280'};
`

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
`

/**
 * Enhanced Select/Dropdown component with search, multi-select, and option groups.
 * Supports keyboard navigation and custom option rendering.
 * 
 * @example
 * ```tsx
 * // Single select
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   searchable
 * />
 * 
 * // Multi-select
 * <Select
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   multiple
 *   searchable
 * />
 * ```
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchable = false,
  multiple = false,
  disabled = false,
  size = 'md',
  label,
  helpText,
  error,
  renderOption,
  renderValue,
  className,
  closeOnSelect = true,
  maxHeight = '300px',
  fullWidth = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Normalize value to array for easier handling
  const selectedValues = useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  // Get selected options
  const selectedOptions = useMemo(() => {
    return options.filter(opt => selectedValues.includes(opt.value))
  }, [options, selectedValues])

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter(opt => 
      opt.label.toLowerCase().includes(query) ||
      opt.value.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  // Group options
  const groupedOptions = useMemo(() => {
    const groups: Record<string, SelectOption[]> = {}
    const ungrouped: SelectOption[] = []
    
    filteredOptions.forEach(opt => {
      if (opt.group) {
        if (!groups[opt.group]) groups[opt.group] = []
        groups[opt.group].push(opt)
      } else {
        ungrouped.push(opt)
      }
    })
    
    return { groups, ungrouped }
  }, [filteredOptions])

  // Handle selection
  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return
    
    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value]
      onChange?.(newValues)
    } else {
      onChange?.(option.value)
      if (closeOnSelect) setIsOpen(false)
    }
  }

  // Handle tag removal (multi-select)
  const handleRemoveTag = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation()
    if (multiple) {
      onChange?.(selectedValues.filter(v => v !== optionValue))
    }
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }, [disabled, isOpen, filteredOptions, highlightedIndex])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search on open
  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0)
    }
    if (!isOpen) {
      setSearchQuery('')
      setHighlightedIndex(0)
    }
  }, [isOpen, searchable])

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const highlighted = listRef.current.children[highlightedIndex] as HTMLElement
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  // Render selected value(s)
  const renderSelectedValue = () => {
    if (selectedOptions.length === 0) {
      return <Placeholder>{placeholder}</Placeholder>
    }
    
    if (renderValue) {
      return renderValue(selectedOptions)
    }
    
    if (multiple) {
      return (
        <SelectedTags>
          {selectedOptions.slice(0, 3).map(opt => (
            <Tag key={opt.value}>
              {opt.label}
              <TagClose onClick={(e) => handleRemoveTag(e, opt.value)}>×</TagClose>
            </Tag>
          ))}
          {selectedOptions.length > 3 && (
            <Tag>+{selectedOptions.length - 3} more</Tag>
          )}
        </SelectedTags>
      )
    }
    
    return selectedOptions[0].label
  }

  // Render option groups
  const renderOptions = () => {
    if (filteredOptions.length === 0) {
      return <NoResults>No options found</NoResults>
    }

    const elements: React.ReactNode[] = []
    
    // Render ungrouped options first
    groupedOptions.ungrouped.forEach((opt, idx) => {
      const isSelected = selectedValues.includes(opt.value)
      elements.push(
        <OptionItem
          key={opt.value}
          $selected={isSelected}
          $highlighted={idx === highlightedIndex}
          $disabled={opt.disabled || false}
          onClick={() => handleSelect(opt)}
          aria-disabled={opt.disabled}
          aria-selected={isSelected}
          role="option"
        >
          {multiple && <Checkbox $checked={isSelected} />}
          {renderOption ? renderOption(opt) : opt.label}
        </OptionItem>
      )
    })
    
    // Render grouped options
    let optionIndex = groupedOptions.ungrouped.length
    Object.entries(groupedOptions.groups).forEach(([groupName, groupOpts]) => {
      elements.push(<GroupLabel key={`group-${groupName}`}>{groupName}</GroupLabel>)
      groupOpts.forEach(opt => {
        const isSelected = selectedValues.includes(opt.value)
        elements.push(
          <OptionItem
            key={opt.value}
            $selected={isSelected}
            $highlighted={optionIndex === highlightedIndex}
            $disabled={opt.disabled || false}
            onClick={() => handleSelect(opt)}
            aria-disabled={opt.disabled}
            aria-selected={isSelected}
            role="option"
          >
            {multiple && <Checkbox $checked={isSelected} />}
            {renderOption ? renderOption(opt) : opt.label}
          </OptionItem>
        )
        optionIndex++
      })
    })
    
    return elements
  }

  return (
    <Container ref={containerRef} className={className} $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      
      <SelectButton
        type="button"
        $size={size}
        $disabled={disabled}
        $error={!!error}
        $isOpen={isOpen}
        $fullWidth={fullWidth}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        {renderSelectedValue()}
        <ChevronIcon $isOpen={isOpen}>▼</ChevronIcon>
      </SelectButton>
      
      {isOpen && (
        <Dropdown $maxHeight={maxHeight} role="listbox">
          {searchable && (
            <SearchInput
              ref={searchRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}
          <OptionsList ref={listRef}>
            {renderOptions()}
          </OptionsList>
        </Dropdown>
      )}
      
      {(helpText || error) && (
        <HelpText $error={!!error}>{error || helpText}</HelpText>
      )}
    </Container>
  )
}

Select.displayName = 'Select'

export default Select
