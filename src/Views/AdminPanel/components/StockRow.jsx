import React, { useState } from "react";

function StockRow({ colors, sizes, onDelete }) {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(0);

    return (
        <div className="flex items-center gap-3">
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                ))}
            </select>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </select>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={onDelete} className="text-white bg-red-500 rounded-md p-1">Delete</button>
        </div>
    );
}

export default StockRow;
