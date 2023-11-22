import React, {useState} from "react";

function SizeComponent({ onDelete }) {
    const [size, setSize] = useState('');

    return (
        <div className="flex flex-col items-start justify-center">
            <label>Size</label>
            <input
                type="text"
                className="w-full block"
                placeholder="Ingrese el tamaño"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
            />
            <button onClick={onDelete} className="text-white bg-red-500 w-full block rounded-md p-1 mt-2">Delete</button>
        </div>
    );
}

export default SizeComponent;
