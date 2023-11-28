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
        setIsAdded(true);
        setSizeInformation(prevSizeInformation => [...prevSizeInformation, { id, size: selectedSize }]);
    };

    useEffect(() => {
        if (isEditMode) {
            handleAddSize();
        }
    }, []);

    const handleAddProductMessages = () => {
    
        if (selectedSize.length === 0) {
          toast.error("Please add the size.", { position: "bottom-right", });
          onDelete(id);
        }
    }

    return (
        <div className="flex flex-col items-start justify-center">
            <label>Size</label>
            <input
                type="text"
                className="w-full block"
                placeholder="Ingrese el tamaño"
                value={selectedSize}
                onChange={handleSizeChange}
                required
                disabled={isAdded}
            />
            <button onClick={() => {handleAddSize(); handleAddProductMessages();}} className={`text-white w-full block rounded-md p-1 mt-2 ${isAdded ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={isAdded}>Add</button>
            <button onClick={() => onDelete(id)} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2" disabled={!isAdded}>Delete</button>
        </div>
    );
}

export default SelectSizeComponent;
