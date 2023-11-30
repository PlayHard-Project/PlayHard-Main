import React, {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";

function ColorComponent({ id, onDelete, setColorInformation, isEditMode = false, color = '', hex = '#ffffff', imagePath = '' }) {
    const [colorName, setColorName] = useState(isEditMode ? color : '');
    const [colorValue, setColorValue] = useState(isEditMode ? hex : '#ffffff');
    const [image, setImage] = useState(isEditMode ? imagePath : '');
    const [input, setInput] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            handleAddColor()
        }
    }, []);

    const handleAddProductMessages = () => {
        if (colorName.trim().length === 0) {
            toast.error("Please add the color name.", { position: "bottom-right", });
            onDelete();
        } else if (image.length === 0) {
            toast.error("Please add the image for the color.", { position: "bottom-right", });
            onDelete();
        }
    }

    const handleAddImage = () => {
        const trimmedInput = input.trim();

        // Check if the input is empty or contains only spaces.
        if (!trimmedInput) {
            toast.error("The input field cannot be empty or contain only spaces.", {
                position: "bottom-right",
            });
            return;
        }

        if (!trimmedInput.startsWith("http://") && !trimmedInput.startsWith("https://") && !trimmedInput.startsWith("data:image/")) {
            toast.error("The image URL should start with 'http://', 'https://' o 'data:image/'", {
                position: "bottom-right",
            });
            return;
        }

        if (!isDisabled) {
            setImage(trimmedInput);
            setInput("");
        }
    };

    const handleDelete = () => {
        onDelete();
    };

    const handleAddColor = () => {
        if (colorName.trim() === '') {
            handleAddProductMessages();
            return;
        }
        setIsDisabled(true);
        setColorInformation(prevColorInformation => {
            const colorExists = prevColorInformation.some(color => color.id === id);
            if (!colorExists) {
                return [...prevColorInformation, {id, color: colorName.trim(), hex: colorValue, imagePath: image}];
            } else {
                return prevColorInformation;
            }
        });
    };



    return (
        <div className="flex gap-2 justify-center items-center">
            <div className="w-1/2 flex flex-col items-start justify-center">
                <label>Color</label>
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="text"
                        className="w-2/3 block border-2 border-gray-500 p-2 hover:border-blue-700 rounded-md hover:text-blue-700 "
                        placeholder="Color name"
                        value={colorName}
                        onChange={(e) => !isDisabled && setColorName(e.target.value.slice(0, 10))}
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
                        className="w-2/3 block border-2 border-gray-500 p-2 hover:border-blue-700 rounded-md hover:text-blue-700 mt-1"
                        placeholder="Image URL"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        disabled={isDisabled}
                    />
                    <button onClick={handleAddImage} className="text-white bg-blue-500 w-1/3 block rounded-md p-1" disabled={isDisabled}>Add image</button>
                </div>
                <button onClick={handleAddColor} className={`text-white w-full block rounded-md p-1 mt-2 ${isDisabled ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={isDisabled}>Add</button>
                <button onClick={handleDelete} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2" disabled={!isDisabled}>Delete</button>
            </div>
            <div className="w-1/4 flex items-center justify-center">
                {image && <img src={image} alt="" className="w-40 h-full object-cover" />}
            </div>
        </div>
    );
}

export default ColorComponent;
