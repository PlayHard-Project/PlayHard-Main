import React, { useState, useEffect } from "react";
import CardsContainerAdmin from "./ProductsAdmin/CardsContainerAdmin";
import CardAdmin from "./ProductsAdmin/CardAdmin";
import { getElementsLazyLoading } from "../../Components/ApiRestHandler/requestHandler";
import '../../css/Products.css'
import {GridLoader} from "react-spinners";
import { Link } from "react-router-dom";

/**
 * AdminPanelView Component
 * 
 * This component represents the main view for the admin panel, displaying a list of products.
 * It fetches products using lazy loading and renders them as cards using the CardAdmin component.
 * Provides a "Load More" button to fetch additional products.
 * 
 * @param {function} setCartItemsQuantity - A function to set the quantity of items in the cart.
 * @param {function} setSubTotal - A function to set the subtotal of the cart.
 */
const AdminPanelView = ({ setCartItemsQuantity, setSubTotal }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch products when the component mounts or the page changes
  useEffect(() => {
    if (page > 0) {
      fetchProducts();
    }
  }, [page]);

  const fetchProducts = async () => {
    try {
      const newProducts = await getElementsLazyLoading('/products', page);
      setProducts(newProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const content = products.map(
    ({ _id, imagePath, name, price, colorInformation, size }) => (
      <CardAdmin
        _id={_id}
        img={imagePath[0]}
        title={name}
        price={price}
        colorInformation={colorInformation}
        size={size}
        setCartItemsQuantity={setCartItemsQuantity}
        setSubTotal={setSubTotal}
      />
    )
  );

  console.log("Page ",{page})
  console.log("Content:",{content})
  console.log("Products:",{products})

  /**
   * Renders a loading component when there are no products available.
   * @param {Array} products - The array of products to be checked for emptiness.
   * @returns {JSX.Element} - The JSX representing the loading component.
   */
  if (products.length === 0) {
    return (
        <div
            className={
              "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container min-h-screen"
            }
        >
          {/* Display a loading spinner with the specified color */}
          <GridLoader color="#023fc5" />
        </div>
    );
  }

  return (
    <div className="container-product container" >
      <Link to="/admin/add-product" className="add-product-link"> + 
      </Link>
      <CardsContainerAdmin content={content} />
    </div>
  );
};

export default AdminPanelView;