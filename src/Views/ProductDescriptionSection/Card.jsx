import React from 'react';
import { Link } from "react-router-dom";
import '../../css/Card.css';

function CustomCard({ item }) {
  return (
    <div className="custom-card">
      <img
        src={item?.imagePath[0]}
        alt={item?.name}
        className="card-image"
      />
      <div className="card-content">
        <Link key={item._id} to={`/product/${item._id}`}>
          <button className="card-title">{item.name}</button>
        </Link>
        <p className="card-price">Bs. {item.price}</p>
      </div>
    </div>
  );
}

export default CustomCard;
