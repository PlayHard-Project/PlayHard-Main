import React, {useEffect, useRef, useState} from "react";

function ColorComponent({ id, onDelete, setColorInformation }) {
    const [colorName, setColorName] = useState('');
    const [colorValue, setColorValue] = useState('#ffffff');
    const [image, setImage] = useState('');
    const [input, setInput] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleAddImage = () => {
        if (!isDisabled) {
            setImage(input);
            setInput('');
        }
    };

    const handleAddColor = () => {
        setIsDisabled(true);
        setColorInformation(prevColorInformation => [...prevColorInformation, {id, color: colorName, hex: colorValue, imagePath: image}]);
    };

    useEffect(() => {
        return () => {
            setColorInformation(prevColorInformation => prevColorInformation.filter(colorInfo => colorInfo.id !== id));
        };
    }, []);

    return (
        <div className="flex gap-2 justify-center items-center">
            <div className="w-1/2 flex flex-col items-start justify-center">
                <label>Color</label>
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="text"
                        className="w-2/3 block"
                        placeholder="Nombre del color"
                        value={colorName}
                        onChange={(e) => !isDisabled && setColorName(e.target.value)}
                        required
                        disabled={isDisabled}
                    />
                    <input
                        type="color"
                        className="w-1/3 block"
                        value={colorValue}
                        onChange={(e) => !isDisabled && setColorValue(e.target.value)}
                        disabled={isDisabled}
                    />
                </div>
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="text"
                        className="w-2/3 block"
                        placeholder="URL de la imagen"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={isDisabled}
                    />
                    <button onClick={handleAddImage} className="text-white bg-blue-500 w-1/3 block rounded-md p-1" disabled={isDisabled}>Add image</button>
                </div>
                <button onClick={handleAddColor} className={`text-white w-full block rounded-md p-1 mt-2 ${isDisabled ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={isDisabled}>Add</button>
                <button onClick={onDelete} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2" disabled={!isDisabled}>Delete</button>
            </div>
            <div className="w-1/4 flex items-center justify-center">
                {image && <img src={image} alt="" className="w-40 h-full object-cover" />}
            </div>
        </div>
    );
}

export default ColorComponent;
