import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";


function SelectSizeComponent({ id, onDelete, setSizeInformation, isEditMode = false, size = '' }) {
    const [selectedSize, setSelectedSize] = useState(isEditMode ? size : '');
    const [isAdded, setIsAdded] = useState(false);


    const handleSizeChange = (e) => {
        if (!isAdded) {
            setSelectedSize(e.target.value.slice(0, 20));
        }
    };

    const handleAddSize = () => {
        if (selectedSize.trim() === '') {
            handleAddProductMessages();
            return;
        }
        setIsAdded(true);
        setSizeInformation(prevSizeInformation => {
            const sizeExists = prevSizeInformation.some(prevSize => prevSize.id === id && prevSize.size === selectedSize.trim());
            if (!sizeExists) {
                return [...prevSizeInformation, { id, size: selectedSize.trim() }];
            }
            return prevSizeInformation;
        });
    };

    useEffect(() => {
        if (isEditMode) {
            handleAddSize();
        }
    }, []);

    const handleAddProductMessages = () => {
        if (selectedSize.trim().length === 0) {
            toast.error("Please add the size.", { position: "bottom-right", });
            onDelete(id);
        }
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <label>Size</label>
            <input
                type="text"
                className="w-full block border-2 border-gray-500 p-2 hover:border-blue-700 rounded-md hover:text-blue-700"
                placeholder="Ingrese el tamaño"
                value={selectedSize}
                onChange={handleSizeChange}
                required
                disabled={isAdded}
            />
            <button onClick={handleAddSize} className={`text-white w-full block rounded-md p-1 mt-2 ${isAdded ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={isAdded}>Add</button>
            <button onClick={() => onDelete(id)} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2" disabled={!isAdded}>Delete</button>
        </div>
    );
}

export default SelectSizeComponent;
