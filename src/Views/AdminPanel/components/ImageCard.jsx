import React from 'react';

function ImageCard({ url, onDelete }) {
    return (
        <div className="lg:w-1/4 w-full p-1">
            <div className="border rounded-md overflow-hidden">
                <img src={url} alt="" className="w-full lg:h-32 h-40 object-cover" />
                <button onClick={onDelete} className="text-white bg-red-500 w-full rounded-b-md p-3">Delete</button>
            </div>
        </div>
    );
}

export default ImageCard;