import React, { useState, useEffect, useRef } from 'react';
import { MdSearch } from 'react-icons/md';


import GridLoader from 'react-spinners/GridLoader';
import {searchElements} from "../../Components/ApiRestHandler/requestHandler";
import SearchResult from "./SearchResult";


/**
 * Functional component representing a search bar with expandable search results.
 * @component
 * @returns {JSX.Element} JSX element representing the search bar.
 */
const SearchBar = ({setProduct, isRedirect}) => {
    /**
     * State representing the current value of the search input.
     * @type {string}
     */
    const [input, setInput] = useState('');

    /**
     * State storing the products obtained through the search.
     * @type {Array}
     */
    const [products, setProducts] = useState([]);

    /**
     * State indicating whether the results list is open or closed.
     * @type {boolean}
     */
    const [isOpen, setIsOpen] = useState(false);

    /**
     * State indicating whether a search is in progress.
     * @type {boolean}
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Reference to the search bar container to detect clicks outside of it.
     * @type {React.RefObject}
     */
    const ref = useRef(null);

    /**
     * Side effect performing the product search when the input value changes.
     * @callback
     */
    useEffect(() => {
        /**
         * Asynchronous function for performing the product search.
         * @async
         */
        const fetchProducts = async () => {
            setIsLoading(true);
            if (input.length > 0) {
                try {
                    const response = await searchElements('/products', input);
                    setProducts(response);
                    setIsOpen(true);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                setIsOpen(false);
            }
            setIsLoading(false);
        };

        /**
         * Timer to delay the search until the user stops typing.
         * @type {number}
         */
        const timerId = setTimeout(() => {
            fetchProducts();
        }, 500);

        /**
         * Clears the timer on component unmount or input value change.
         */
        return () => {
            clearTimeout(timerId);
        };
    }, [input]);

    /**
     * Side effect closing the results list when clicking outside the search bar.
     * @callback
     */
    useEffect(() => {
        /**
         * Event handler closing the results list when clicking outside the search bar.
         * @param {Event} event - Click event.
         */
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        /**
         * Removes the event listener on component unmount.
         */
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

     /**
     * Renders the search bar component.
     * @returns {JSX.Element} JSX element representing the search bar.
     */
     return (
        <div className="relative" ref={ref}>
            <div className="flex items-center search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    maxLength={100}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button>
                    {isLoading ? (
                        <GridLoader color="#023fc5" size={3} className={'m-3'} />
                    ) : (
                        <MdSearch size={24} color="#72a3ff" />
                    )}
                </button>
            </div>
            {isOpen && <SearchResult setProduct={setProduct} products={products} setInput={setInput} isRedirect={isRedirect} se />}
        </div>
    );
};

export default SearchBar;