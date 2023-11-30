// SelectWithAddButton.jsx
import React from "react";

/**
 * SelectWithAddButton Component
 *
 * This component provides a dropdown select input with an "Add" button,
 * allowing users to dynamically add items to a selected list.
 *
 * @component
 *
 * @param {string} id - The HTML id attribute for the select input. (required)
 * @param {string} value - The selected value of the select input. (required)
 * @param {Function} onChange - Event handler function for the select input's change event. (required)
 * @param {string} inputValue - The value of the input field for adding new items. (required)
 * @param {Function} onInputChange - Event handler function for the input field's change event. (required)
 * @param {Function} onAdd - Event handler function for the "Add" button click event. (required)
 * @param {Array} options - An array of strings representing the available options in the select input. (required)
 * @param {Array} selectedItems - An array of strings representing the selected items. (required)
 * @param {Function} onRemoveItem - Event handler function for removing an item from the selected items list. (required)
 * @param {string} placeholder - The placeholder text for the select input. (required)
 */
const SelectWithAddButton = ({
  id,
  value,
  onChange,
  inputValue,
  onInputChange,
  onAdd,
  options,
  selectedItems,
  onRemoveItem,
  placeholder,
}) => {
  return (
    <div className="category-section-general">
      <div className="category-section">
        <select id={id} value={value} onChange={onChange} required>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={onAdd}
          style={{
            borderRadius: "10px",
            border: "2px solid #888383",
            height: "44px",
            width: "40px",
            marginLeft: "10px",
            fontSize: "20px",
          }}
        >
          +
        </button>
      </div>
      <div className="category-section-selected">
        <div className="selected-categories">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-category">
              {item}
              <button onClick={() => onRemoveItem(item)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWithAddButton;