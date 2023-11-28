import React from 'react';
import "../../../css/AdminPanelStyle/MainPage/CardsContainerAdmin.css";

/**
 * CardsContainerAdmin Component
 * 
 * This component represents a container for displaying a collection of cards in an admin panel.
 * It takes a `content` prop, which should be an array of React elements (cards) to be displayed within the container.
 * 
 * @param {Array<ReactElement>} content - An array of React elements (cards) to be displayed within the container.
 */
const CardsContainerAdmin = ({ content }) => {
    return (
        <section className="card-container-admin">
            {content}
        </section>
    );
};

export default CardsContainerAdmin;
