import React, { useState, useEffect } from "react";
import CardsContainer from "../Products/CardsContainer";
import ShoppingCard from "../Products/ShoppingCard";
import {getElementsLazyLoading, getFilteredElementsLazyLoading} from "../../Components/ApiRestHandler/requestHandler";
import Sidebar from "../Products/Sidebar";
import '../../css/Products.css'
import {GridLoader} from "react-spinners";
import toast from "react-hot-toast";

const Products = ({ setCartItemsQuantity, setSubTotal }) => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const [products, setProducts] = useState([]);
  const [pageLimit, setPageLimit] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts.call();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await getFilteredElementsLazyLoading('/products', params, page);
      setProducts(response.data);
      setPageLimit(response.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const content = products.map(
      ({ _id, imagePath, name, price, colorInformation, size }) => (
          <ShoppingCard
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

  /**
   * Renders a loading component when there are no products available.
   * @param {Array} products - The array of products to be checked for emptiness.
   * @returns {JSX.Element} - The JSX representing the loading component.
   */
  if (products.length === 0) {
    return (
        <div
            className="flex flex-col items-center justify-center p-3 gap-16 min-h-screen"
        >
          <GridLoader color="#023fc5" />
        </div>
    );
  }

  return (
      <div className="container-product container">
        <Sidebar className="sidebar" />
        <CardsContainer className="cards-container" content={content} pages={pageLimit} setPage={setPage}/>
        {loading ? <GridLoader color="#023fc5" /> : <></>}
      </div>
  );
};

export default Products;
