import React from 'react';
import ItemCart from '../Cart/ItemCart.jsx';

const Contact = () => {
    return (
        <div className= "container">
            <h1>Contact Page</h1>
            {/*HERE I TEST THE ITEM OF THE CART*/}
            <ItemCart productID="654c436360c78adccb61fc0b" size={3} color={1} quantity={2}></ItemCart>
            {/* Contact content*/}
        </div>
    );
};

export default Contact;
