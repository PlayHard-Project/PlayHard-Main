import React, { useEffect, useState } from "react";
import "../../../css/SpinnersInputNumber.css"

function StockItem({ color, size, handleQuantityChange, sizeIndex, initialQuantity = 1, isEditMode = false }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleChange = (newQuantity) => {
        setQuantity(newQuantity);
        handleQuantityChange(color, size, newQuantity, sizeIndex);
    };

    const increment = () => {
        if(quantity < 20){
            handleChange(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 0) {
            handleChange(quantity - 1);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            handleChange(initialQuantity);
        }
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-center gap-1 border-2 border-gray-500 p-2 hover:border-blue-700 rounded-md hover:text-blue-700">
            <p className="w-full sm:w-1/3 p-2 text-center">Color: {color.color}</p>
            <p className="w-full sm:w-1/3 p-2 text-center">Size: {size.size}</p>
            <div className="w-full xl:w-1/5 p-2 flex items-center justify-center xl:justify-start ">
                <button onClick={decrement} className="border-2 border-gray-500 px-2.5 py-1 rounded hover:border-blue-700">-</button>
                <input type="number" min={0} max={20} value={quantity} readOnly className="text-center m-0 remove-arrow"  />
                <button onClick={increment} className="border-2 border-gray-500 px-2 py-1 rounded hover:border-blue-700">+</button>
            </div>
        </div>
    );
}

export default StockItem;