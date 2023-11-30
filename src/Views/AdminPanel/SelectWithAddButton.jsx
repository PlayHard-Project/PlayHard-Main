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
    <div className="category-section-general w-full ">
      <div className="category-section hover:text-blue-700 flex align-middle justify-center">
        <select id={id} value={value} onChange={onChange} required className={'hover:border-blue-700'}>
          <option value="" disabled className={'hover:border-blue-700'}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
          <button
              className="hover:border-blue-700 border-2 w-10 h-10 rounded-3xl flex items-center justify-center text-lg"
              onClick={onAdd}>
              +
          </button>
      </div>
      <div className="category-section-selected">
        <div className="selected-categories hover:border-blue-700">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-category border-blue-700">
              {item}
                <button className="hover:border-blue-700 rounded-full text-center w-10 h-10 flex items-center justify-center" onClick={() => onRemoveItem(item)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWithAddButton;