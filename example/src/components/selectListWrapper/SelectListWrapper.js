// Disabling eslinting in the stories file
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { MultiSelect } from "swigg";

const itemList = [
  { id: 1, value: "Lorem ipsum dolor sit amet." },
  { id: 2, value: "Flesh out above the fold." },
  { id: 3, value: "Steamed blue mountain java coffee." },
  { id: 4, value: "Let us wax poetic about the beauty of the cheeseburger." },
];

const SelectItem = ({ id, content }) => <span key={`${id}`}>{content}</span>;

const SelectListWrapper = () => {
  const [selectedItems, updateSelectedItems] = useState([]);
  const ref = useRef();

  const MultiSelectListData = {
    label: "Select some Ipsums",
    itemClassList: "custom-item-class",
    selectedItemClassList: "custom-selected-item-class",
    items: itemList,
    sendItems(items) {
      MultiSelectListData.selectedItems = items;
    },
    initialSelectedItemList: [
      { id: 1, value: "Lorem ipsum dolor sit amet." },
      { id: 2, value: "Flesh out above the fold." },
    ],
  };

  const ListItems = itemList.map((item) => <SelectItem id={`${item.id}`} content={item.value} />);

  return (
    <React.Fragment>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ marginRight: "16px" }}
          className="btn btn-primary"
          onClick={() => ref.current.setSelectedItemsList([])}
        >
          reset
        </button>
        <button
          style={{ marginRight: "16px" }}
          className="btn btn-primary"
          onClick={() => ref.current.setSelectedItemsListFromIds(itemList)}
        >
          Select All
        </button>
        <button className="btn btn-primary" onClick={() => ref.current.setSelectedItemsListFromIds([itemList[1], itemList[3]])}>
          Add 2 and 4
        </button>
      </div>

      <div>
        {selectedItems.map((item) => (
          <div
            style={{
              background: "ghostwhite",
              border: "2px solid gainsboro",
              padding: "7px",
              borderRadius: "7px",
              marginBottom: "7px",
              cursor: "pointer",
            }}
            key={`display-item-${item.props.id}`}
            onClick={() => ref.current.toggleItem(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <MultiSelect
        ref={ref}
        {...MultiSelectListData}
        updateSelectedItems={updateSelectedItems}
        initialSelectedItemList={[ListItems[0], ListItems[3]]}
      >
        {ListItems}
      </MultiSelect>

      <h2 style={{ margin: "0" }}>Select individual items</h2>
      <em>If they are already selected it will remove them</em>
      <div>
        {ListItems.map((item, index) => (
          <div
            key={`add-item-${index}`}
            style={{
              background: "ghostwhite",
              border: "2px solid gainsboro",
              padding: "7px",
              borderRadius: "7px",
              marginBottom: "7px",
              cursor: "pointer",
            }}
            onClick={() => ref.current.toggleItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export { SelectListWrapper };
