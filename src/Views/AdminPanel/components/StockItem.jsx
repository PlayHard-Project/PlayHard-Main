import React, { useState } from "react";

function StockItem({ color, size, handleQuantityChange, sizeIndex }) {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        setQuantity(e.target.value);
        handleQuantityChange(color, size, e.target.value, sizeIndex);
    };

    return (

        <div className="flex justify-between border border-gray-300 rounded">
            {handleChange}
            <p className="w-1/3 p-2">Color: {color.color}</p>
            <p className="w-1/3 p-2">Size: {size.size}</p>
            <input type="number" min={1} max={20} value={quantity} onChange={handleChange} onKeyPress={(e) => e.preventDefault()} className="w-1/5 p-2" />
        </div>
    );
}

export default StockItem;