import React, {useState} from "react";

function ColorComponent({ onDelete }) {
    const [colorName, setColorName] = useState('');
    const [colorValue, setColorValue] = useState('#ffffff');
    const [image, setImage] = useState('');
    const [input, setInput] = useState('');

    const handleAddImage = () => {
        setImage(input);
        setInput('');
    };



    return (
        <div className="flex gap-2 h-40 justify-center items-center">
            <div className="w-1/2 flex flex-col items-start justify-center">
                <label>Color</label>
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="text"
                        className="w-2/3 block"
                        placeholder="Nombre del color"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        required
                    />
                    <input
                        type="color"
                        className="w-1/3 block"
                        value={colorValue}
                        onChange={(e) => setColorValue(e.target.value)}
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
                    />
                    <button onClick={handleAddImage} className="text-white bg-blue-500 w-1/3 block rounded-md p-1">Add image</button>
                </div>
                <button onClick={onDelete} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2">Delete</button>
            </div>
            <div className="w-1/4 flex items-center justify-center">
                {image && <img src={image} alt="" className="w-40 h-full object-cover" />}
            </div>
        </div>
    );
}

export default ColorComponent;
