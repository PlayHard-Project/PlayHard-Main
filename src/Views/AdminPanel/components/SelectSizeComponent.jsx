import React, {useEffect, useState} from "react";

function SelectSizeComponent({ id, onDelete, setSizeInformation }) {
    const [size, setSize] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    const handleSizeChange = (e) => {
        if (!isAdded) {
            setSize(e.target.value);
        }
    };

    const handleAddSize = () => {
        setIsAdded(true);
        setSizeInformation(prevSizeInformation => [...prevSizeInformation, { id, size }]);
    };



    return (
        <div className="flex flex-col items-start justify-center">
            <label>Size</label>
            <input
                type="text"
                className="w-full block"
                placeholder="Ingrese el tamaño"
                value={size}
                onChange={handleSizeChange}
                required
                disabled={isAdded}
            />
            <button onClick={handleAddSize} className={`text-white w-full block rounded-md p-1 mt-2 ${isAdded ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={isAdded}>Agregar</button>
            <button onClick={() => onDelete(id)} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2" disabled={!isAdded}>Delete</button>
        </div>
    );
}

export default SelectSizeComponent;
