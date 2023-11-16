import React from 'react';

const Dropdown = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                zIndex: 1,
            }}
        >
            <button>T Shirts</button>
            <button>Jerseys</button>
            <button>Hoodies</button>
            <button>Jackets</button>
            <button>Shorts</button>
            <button>Pants</button>
            <button>Socks</button>
        </div>
    );
};

export default Dropdown;