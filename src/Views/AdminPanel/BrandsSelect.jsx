// BrandsSelect.jsx
import React from "react";
import "../../css/AdminPanelStyle/simpleDataComponentStyle.css";

/**
 * BrandsSelect Component
 *
 * A component for selecting a brand from a list of options.
 *
 * @component
 *
 * @param {string} value - The selected value.
 * @param {Function} onChange - Function to handle the change event.
 * @param {Array} options - Array of brand options.
 */
const BrandsSelect = ({ value, onChange, options }) => {
  return (
    <div className="simple-data-container-form">
      <label htmlFor="brand">Brand</label>
      <select className="select" id="brand" value={value} onChange={onChange} required>
        <option value="">Select a brand</option>
        {options.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandsSelect;