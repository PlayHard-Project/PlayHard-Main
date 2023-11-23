import React from 'react';
import "../../css/CardsContainer.css";

const CardsContainer = ({ content }) => {
    return (
        <section className="card-container lg:w-4/5">
            {content}
        </section>
    );
};

export default CardsContainer;
