import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useCombobox } from 'downshift'

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
`

const SelectToggle = styled.div`
  position: relative;
  width: 100%;
  min-height: 45px;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 7px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #e9ecef;
  }

  &.is-open {
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-right: ${props => props.hasButton ? '120px' : '30px'};

  .count {
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .items {
    color: #6c757d;
  }
`

const ActionButtons = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: #7162e8;
    color: white;

    &:hover {
      background: rgba(113, 98, 232, 0.85);
    }
  }

  &.secondary {
    background: #e9ecef;
    color: #495057;

    &:hover {
      background: #dee2e6;
    }
  }
`

const ItemsList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const Item = styled.li`
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &.is-active {
    background: rgba(113, 98, 232, 0.1);
    color: #7162e8;
  }

  &.is-highlighted {
    background: #f8f9fa;
  }
`

/** Use to create custom styled select lists for UI components. This component uses Downshift to create accessible select lists. */
const MultiSelect = forwardRef(({
  items,
  label,
  isEditable = true,
  hasButton = true,
  buttonText = 'Done',
  className = '',
  itemClassName = '',
  selectedItemClassName = '',
  onSelectionChange = () => {},
  initialSelected = [],
  closeOnSelect = false,
  disabled = false
}, ref) => {
  const [selectedItems, setSelectedItems] = useState(initialSelected)

  useEffect(() => {
    onSelectionChange(selectedItems)
  }, [selectedItems, onSelectionChange])

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu
  } = useCombobox({
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem || disabled) return

      setSelectedItems(prev => {
        const isSelected = prev.some(item => item.id === selectedItem.id)
        return isSelected
          ? prev.filter(item => item.id !== selectedItem.id)
          : [...prev, selectedItem]
      })
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: !closeOnSelect,
            highlightedIndex: state.highlightedIndex
          }
        default:
          return changes
      }
    }
  })

  const handleSelectAll = () => !disabled && setSelectedItems(items)
  const handleClearAll = () => !disabled && setSelectedItems([])
  const handleDone = () => !disabled && closeMenu()

  useImperativeHandle(ref, () => ({
    setSelected: (items) => setSelectedItems(items),
    getSelected: () => selectedItems,
    clearSelection: handleClearAll,
    closeDropdown: closeMenu,
    openDropdown: openMenu
  }))

  return (
    <SelectWrapper className={className}>
      {label && (
        <Label {...getLabelProps()}>
          {label}
        </Label>
      )}

      <div {...getComboboxProps()} aria-disabled={disabled}>
        <SelectToggle
          className={isOpen ? 'is-open' : ''}
          onClick={() => isEditable && !disabled && !isOpen && openMenu()}
          {...getInputProps()}
          style={{ pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.6 : 1 }}
        >
          <SelectedItems hasButton={hasButton}>
            {selectedItems.length > 0
              ? (
              <>
                <span className="count">{selectedItems.length} selected</span>
                <span className="items">
                  {selectedItems.map(item => item.label).join(', ')}
                </span>
              </>
                )
              : (
                  'Select items...'
                )}
          </SelectedItems>

          {isOpen && hasButton && (
            <ActionButtons>
              <Button
                className="secondary"
                onClick={selectedItems.length ? handleClearAll : handleSelectAll}
                disabled={disabled}
              >
                {selectedItems.length ? 'Clear All' : 'Select All'}
              </Button>
              <Button
                className="primary"
                onClick={handleDone}
                disabled={disabled}
                {...getToggleButtonProps()}
              >
                {buttonText}
              </Button>
            </ActionButtons>
          )}
        </SelectToggle>

        <ItemsList {...getMenuProps()} style={{ display: isOpen ? 'block' : 'none' }}>
          {isOpen && items.map((item, index) => (
            <Item
              key={item.id}
              className={`
                ${itemClassName}
                ${selectedItems.some(selected => selected.id === item.id) ? `is-active ${selectedItemClassName}` : ''}
                ${highlightedIndex === index ? 'is-highlighted' : ''}
              `}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </Item>
          ))}
        </ItemsList>
      </div>
    </SelectWrapper>
  )
})

MultiSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string,
  isEditable: PropTypes.bool,
  hasButton: PropTypes.bool,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  selectedItemClassName: PropTypes.string,
  onSelectionChange: PropTypes.func,
  initialSelected: PropTypes.array,
  closeOnSelect: PropTypes.bool,
  disabled: PropTypes.bool
}

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect
