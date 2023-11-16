import React from 'react';
import "../../css/CardsContainer.css";

const CardsContainer = ({ content }) => {
    return (
        <section className="card-container">
            {content}
        </section>
    );
};

export default CardsContainer;
