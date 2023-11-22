import React from 'react';
import SearchResultItem from "./SearchResultItem";


/**
 * Functional component representing the search results.
 * @component
 * @param {Object} props - Properties passed to the component.
 * @param {Array} props.products - Array of products to be displayed in the search results.
 * @param {Function} props.setInput - Function to update the search input in the parent component.
 * @returns {JSX.Element} JSX element representing the search results.
 */
const SearchResult = ({ products, setInput }) => {
    /**
     * Renders the search results component.
     * @returns {JSX.Element} JSX element representing the search results.
     */
    return (
        <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg">
            {products.slice(0, 10).map((product) => (
                /**
                 * Renders a search result item.
                 * @returns {JSX.Element} JSX element representing a search result item.
                 */
                <SearchResultItem key={product._id} product={product} setInput={setInput} />
            ))}
        </div>
    );
};

export default SearchResult;