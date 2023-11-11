import React from 'react';

function CustomCard({ item }) {
  return (
    <button
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid rgb(49, 54, 61)',
        backgroundColor: '#fff',
        color: '#000',
        textIndent: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src={item?.image}
        alt={item?.name}
        style={{
          width: '100%',
          height: '70%',
          objectFit: 'cover',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      />
      <div style={{ padding: '5%', textAlign: "left" }}>
        <h3 style={{ marginBottom: '8px' }}>{item.name}</h3>
        <p>{item.price}</p>
      </div>
    </button>
  );
}

export default CustomCard;
