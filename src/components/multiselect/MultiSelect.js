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
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
`

const SelectToggle = styled.div`
  position: relative;
  width: 100%;
  min-height: 45px;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.gray[400]};
  }

  &.is-open {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }
`

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-right: ${props => props.hasButton ? '120px' : '30px'};

  .count {
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    margin-right: 0.5rem;
  }

  .items {
    color: ${props => props.theme.colors.gray[600]};
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
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.primary}dd;
    }
  }

  &.secondary {
    background: ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.gray[700]};

    &:hover {
      background: ${props => props.theme.colors.gray[300]};
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
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const Item = styled.li`
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }

  &.is-active {
    background: ${props => props.theme.colors.primary}11;
    color: ${props => props.theme.colors.primary};
  }

  &.is-highlighted {
    background: ${props => props.theme.colors.gray[100]};
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
  disabled = false,
  closeOnSelect = false
}, ref) => {
  const [selectedItems, setSelectedItems] = useState(initialSelected)

  useEffect(() => {
    onSelectionChange(selectedItems)
  }, [selectedItems])

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
    closeMenu,
    setHighlightedIndex
  } = useCombobox({
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return

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
            // Keep the menu open unless closeOnSelect is true
            isOpen: !closeOnSelect,
            // Maintain highlight on the selected item
            highlightedIndex: state.highlightedIndex
          }
        default:
          return changes
      }
    }
  })

  const handleSelectAll = () => setSelectedItems(items)
  const handleClearAll = () => setSelectedItems([])
  const handleDone = () => {
    closeMenu()
  }

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

      <div {...getComboboxProps()}>
        <SelectToggle 
          className={isOpen ? 'is-open' : ''} 
          onClick={() => isEditable && !isOpen && openMenu()}
          {...getInputProps()}
        >
          <SelectedItems hasButton={hasButton}>
            {selectedItems.length > 0 ? (
              <>
                <span className="count">{selectedItems.length} selected</span>
                <span className="items">
                  {selectedItems.map(item => item.label).join(', ')}
                </span>
              </>
            ) : (
              'Select items...'
            )}
          </SelectedItems>

          {isOpen && hasButton && (
            <ActionButtons>
              <Button 
                className="secondary"
                onClick={selectedItems.length ? handleClearAll : handleSelectAll}
              >
                {selectedItems.length ? 'Clear All' : 'Select All'}
              </Button>
              <Button 
                className="primary"
                onClick={handleDone}
                {...getToggleButtonProps()}
              >
                {buttonText}
              </Button>
            </ActionButtons>
          )}
        </SelectToggle>

        <ItemsList {...getMenuProps()} style={!isOpen ? { display: 'none' } : {}}>
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
  disabled: PropTypes.bool,
  closeOnSelect: PropTypes.bool
}

export default MultiSelect
