import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component representing an individual item in the search results.
 * @component
 * @param {Object} props - Properties passed to the component.
 * @param {Object} props.product - The product data for the search result item.
 * @param {Function} props.setInput - Function to update the search input in the parent component.
 * @returns {JSX.Element} JSX element representing an individual search result item.
 */
const SearchResultItem = ({ product, setInput }) => {
    /**
     * Renders an individual search result item with a link to the product details page.
     * @returns {JSX.Element} JSX element representing an individual search result item.
     */
    return (
        <Link to={`/product/${product._id}`} className="block">
            <button className="flex justify-between items-center w-full text-left p-2 hover:bg-gray-100"
                    onClick={(event) => setInput('')}>
                <img src={product.imagePath[0]} alt={product.name} className="w-10 h-10 object-cover mr-2" />
                <span className="flex-grow text-black">{product.name}</span>
                <span className={'text-black'}>{product.price}</span>
            </button>
        </Link>
    );
};

export default SearchResultItem;