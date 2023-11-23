import React, { useState } from "react";
import ImageCard from "../components/ImageCard";
import ColorComponent from "../components/ColorComponent";
import StockItem from "../components/StockItem";
import SelectSizeComponent from "../components/SelectSizeComponent";

function RightSide({setProductImages, setColorInformation, setSizeInformation, setStockInformation, colorInformation, sizeInformation}) {
    const [images, setImages] = useState([]);
    const [input, setInput] = useState('');
    const [colorComponents, setColorComponents] = useState([]);
    const [sizeComponents, setSizeComponents] = useState([]);
    const [stockRows, setStockRows] = useState([]);

    const handleAddImage = () => {
        const newImages = [...images, input];
        setImages(newImages);
        setProductImages(newImages);
        setInput('');
    };

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        setProductImages(newImages);
    };


    const handleAddColorComponent = () => {
        const id = Math.random(); // Genera un identificador único
        setColorComponents(prevColorComponents => [
            ...prevColorComponents,
            <ColorComponent
                key={id}
                id={id}
                onDelete={() => handleDeleteColorComponent(id)}
                setColorInformation={setColorInformation}
            />,
        ]);
    };

    const handleDeleteColorComponent = (id) => {
        setColorComponents(prevColorComponents => prevColorComponents.filter((component) => component.props.id !== id));
        setColorInformation(prevColorInformation => prevColorInformation.filter(colorInfo => colorInfo.id !== id));
    };



    const handleAddSizeComponent = () => {
        const id = Math.random(); // Genera un identificador único
        setSizeComponents(prevSizeComponents => [
            ...prevSizeComponents,
            <SelectSizeComponent
                key={id}
                id={id}
                onDelete={handleDeleteSizeComponent}
                setSizeInformation={setSizeInformation}
            />,
        ]);
    };

    const handleDeleteSizeComponent = (id) => {
        setSizeComponents(prevSizeComponents => prevSizeComponents.filter((component) => component.props.id !== id));
        setSizeInformation(prevSizeInformation => prevSizeInformation.filter(sizeInfo => sizeInfo.id !== id));
    };

    const handleQuantityChange = (color, size, quantity) => {
        setStockInformation(prevStockInformation => {
            const index = prevStockInformation.findIndex(stock =>
                stock.color && stock.color.id === color.id && stock.size && stock.size.id === size.id
            );

            if (index !== -1) {
                const updatedStockInformation = [...prevStockInformation];
                updatedStockInformation[index].quantity = quantity;
                return updatedStockInformation;
            } else {
                return [...prevStockInformation, { color, size, quantity }];
            }
        });
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
                <div className="overflow-auto h-44 flex flex-col gap-3">
                    {colorComponents}
                </div>
                <button onClick={handleAddColorComponent} className="text-white bg-blue-500 w-full rounded-md p-3">Add new color</button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label>Sizes</label>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 overflow-auto h-40">
                    {sizeComponents}
                </div>
                <button onClick={handleAddSizeComponent} className="text-white bg-blue-500 w-full rounded-md p-3">Add new size</button>
            </div>

            <div>
                <label className={'mb-3'}>Stock</label>
                <div className={'flex flex-col gap-1'}>
                    {colorInformation.map(color =>
                        sizeInformation.map(size =>
                            <StockItem
                                key={`${color.id}-${size.id}`}
                                color={color}
                                size={size}
                                handleQuantityChange={handleQuantityChange}
                            />
                        )
                    )}
                </div>
            </div>

        </div>
    );
}

export default RightSide;
