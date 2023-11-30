import React, { useState, useEffect, createContext } from "react";
import CardsContainer from "../Products/CardsContainer";
import ShoppingCard from "../Products/ShoppingCard";
import {getFilteredElementsLazyLoading} from "../../Components/ApiRestHandler/requestHandler";
import Sidebar from "../Products/Sidebar";
import '../../css/Products.css'
import {GridLoader} from "react-spinners";
import {useParams} from "react-router-dom";
import { SlEqualizer } from "react-icons/sl";

const Products = ({ setCartItemsQuantity, setSubTotal }) => {
  const { query } = useParams();
  let queryAssembly = {};
  if (query !== null && query !== undefined) {
      const splitted = query.split("=");
      const key = splitted[0];
      const value = splitted[1];
      queryAssembly = {[key]:value};
  } else {
      queryAssembly = {};
  }
  const [page, setPage] = useState(1);
  const [params, setParams] = useState(queryAssembly);
  const [products, setProducts] = useState([]);
  const [pageLimit, setPageLimit] = useState(1);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [checkboxState, setCheckboxState] = useState({});

  const updateCheckboxState = (checkboxId, isChecked) => {
      setCheckboxState(prevState => ({
          ...prevState,
          [checkboxId]: isChecked,
      }));
  };

  const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
      fetchProducts();
  }, [page]);

  useEffect(() => {
      setPage(1);
      if (params !== {}) {
          fetchProducts();
      }
  }, [params]);


  const fetchProducts = async () => {
    try {
      const response = await getFilteredElementsLazyLoading('products/available-products', params, page);
      setProducts(response.data);
      console.log(response.totalPages);
      if (pageLimit !== response.totalPages) {
          setPageLimit(response.totalPages);
      }
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
          <SlEqualizer onClick={toggleSidebar} className="filter-button"/>
          {sidebarVisible && <Sidebar className="sidebar" key={"sidebar"} setParams={setParams} query={query}/>}
          <div className="main-content">
              <CardsContainer className="cards-container" content={content} pages={pageLimit} setPage={setPage}/>
          </div>
      </div>
  );
};

export default Products;
