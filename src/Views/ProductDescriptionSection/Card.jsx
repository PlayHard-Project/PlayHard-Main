import React from 'react';
import '../../css/Card.css';

function CustomCard({ item }) {
  return (
    <button className="custom-card">
      <img
        src={item?.image}
        alt={item?.name}
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-price">{item.price}</p>
      </div>
    </button>
  );
}

export default CustomCard;
