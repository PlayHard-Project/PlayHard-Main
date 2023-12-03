import React, {useState} from 'react';
import "../../css/CardsContainer.css";

const CardsContainer = ({ content, pages, setPage }) => {
    const [activePage, setActivePage] = useState(1);
    const handleClick = (index) => {
        setPage(index)
        setActivePage(index);
        window.scrollTo(0,0);
    }   

    const pageButtons = Array.from({ length: pages }, (_, index) => (
        <button key={index + 1} className={`pageButton ${activePage === index + 1 ? 'active' : ''}`} onClick={() => handleClick(index + 1)}>{index + 1}</button>
    ));

    return (
        <div className="rightSide">
            <section className="card-container">
                {content}
            </section>
            <div className="pagePicker">
                {pageButtons}
            </div>
        </div>
    );
};

export default CardsContainer;
