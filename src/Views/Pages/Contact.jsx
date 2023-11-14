import React from 'react';
import Item from '../CartViews/Item.jsx';

const Contact = () => {
    return (
        <div className= "container">
            <h1>Contact Page</h1>
            {/*HERE I TEST THE ITEM OF THE CART*/}
            <Item productID="654c436360c78adccb61fbe8" size="XL" color="Yellow" quantity={2}></Item>
            {/* Contact content*/}
        </div>
    );
};

export default Contact;
