import React, { useState } from "react";

function StockItem({color, size, handleQuantityChange }) {
    const [quantity, setQuantity] = useState(0);

    const handleChange = (e) => {
        setQuantity(e.target.value);
        handleQuantityChange(color, size, e.target.value);
    };

    return (
        <div className="flex justify-between border border-gray-300 rounded">
            <p className="w-1/3 p-2">Color: {color.color}</p>
            <p className="w-1/3 p-2">Size: {size.size}</p>
            <input type="number" value={quantity} onChange={handleChange} className="w-1/5 p-2" />
            <button className="w-1/5 bg-blue-500 p-2 text-white">Agregar</button>
        </div>
    );
}

export default StockItem;