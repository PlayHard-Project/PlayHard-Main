import React, { useState } from "react";
import ImageCard from "../components/ImageCard";
import ColorComponent from "../components/ColorComponent";
import SizeComponent from "../components/SizeComponent";
import StockRow from "../components/StockRow";

function RightSide() {
    const [images, setImages] = useState([]);
    const [input, setInput] = useState('');
    const [colorComponents, setColorComponents] = useState([]);
    const [sizeComponents, setSizeComponents] = useState([]);
    const [stockRows, setStockRows] = useState([]);

    const handleAddImage = () => {
        setImages([...images, input]);
        setInput('');
    };

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddColorComponent = () => {
        setColorComponents([...colorComponents, <ColorComponent key={colorComponents.length} onDelete={() => handleDeleteColorComponent(colorComponents.length)} />]);
    };

    const handleDeleteColorComponent = (index) => {
        setColorComponents(colorComponents.filter((_, i) => i !== index));
    };

    const handleAddSizeComponent = () => {
        setSizeComponents([...sizeComponents, <SizeComponent key={sizeComponents.length} onDelete={() => handleDeleteSizeComponent(sizeComponents.length)} />]);
    };

    const handleDeleteSizeComponent = (id) => {
        setSizeComponents(sizeComponents.filter((component) => component.id !== id));
    };

    const handleAddStockRow = () => {
        setStockRows([...stockRows, <StockRow key={stockRows.length} colors={colorComponents} sizes={sizeComponents} onDelete={() => handleDeleteStockRow(stockRows.length)} />]);
    };

    const handleDeleteStockRow = (index) => {
        setStockRows(stockRows.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="flex flex-col mb-2">
                <label>Add reference images (URL)</label>
                <div className="flex flex-col lg:flex-row gap-3">
                    <input
                        type="text"
                        className="input-add_right lg:w-2/3 block"
                        placeholder="hola mundo"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                    <button onClick={handleAddImage} className="text-white bg-blue-500 lg:w-1/3 block rounded-md p-3">Add</button>
                </div>
            </div>

            <div className="flex flex-wrap overflow-auto h-64 mb-4">
                {images.map((url, index) => (
                    <ImageCard key={index} url={url} onDelete={() => handleDeleteImage(index)} />
                ))}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label>Colors</label>
                <div className="overflow-auto h-64 flex flex-col gap-3">
                    {colorComponents}
                </div>
                <button onClick={handleAddColorComponent} className="text-white bg-blue-500 w-full rounded-md p-3">Add new color</button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label>Sizes</label>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 overflow-auto h-64">
                    {sizeComponents.map((component, index) => (
                        <SizeComponent key={component.id} onDelete={() => handleDeleteSizeComponent(component.id)} />
                    ))}
                </div>
                <button onClick={handleAddSizeComponent} className="text-white bg-blue-500 w-full rounded-md p-3">Add new size</button>
            </div>

            <div className="flex flex-col gap-3">
                <label>Stock</label>
                <div className="overflow-auto h-64">
                    {stockRows}
                </div>
                <button onClick={handleAddStockRow} className="text-white bg-blue-500 w-full rounded-md p-3">Add new stock</button>
            </div>
        </div>
    );
}

export default RightSide;
