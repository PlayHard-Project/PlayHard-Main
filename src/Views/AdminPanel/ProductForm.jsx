// ProductForm.jsx
import React from "react";

/**
 * ProductForm Component
 *
 * This component represents a form input for product details, such as name, description, etc.
 *
 * @component
 *
 * @param {string} label - The label for the form input. (required)
 * @param {string} id - The HTML id attribute for the form input. (required)
 * @param {string} value - The value of the form input. (required)
 * @param {Function} onChange - Event handler function for the form input's change event. (required)
 * @param {string} inputType - The type of the form input (e.g., "text" or "textarea"). Defaults to "text".
 * @param {string} placeholder - The placeholder text for the form input.
 * @param {Function} onKeyDown - Event handler function for the form input's keydown event.
 */
const ProductForm = ({
  label,
  id,
  value,
  onChange,
  inputType = "text",
  placeholder,
  onKeyDown,
}) => {
  return (
    <div className="simple-data-container-form w-full border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700">
      <label className={'hover:text-blue-700'} htmlFor={id}>{label}</label>
      {inputType === "textarea" ? (
        <textarea
          id={id}
          className="input-add__admin w-full hover:border-blue-700 resize-none"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={inputType}
          id={id}
          className="input-add__admin w-full hover:border-blue-700"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};

export default ProductForm;