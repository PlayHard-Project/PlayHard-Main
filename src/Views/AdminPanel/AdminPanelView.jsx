import React, { useState, useEffect } from "react";
import CardsContainerAdmin from "./ProductsAdmin/CardsContainerAdmin";
import CardAdmin from "./ProductsAdmin/CardAdmin";
import { getFilteredElementsLazyLoading } from "../../Components/ApiRestHandler/requestHandler";
import '../../css/Products.css';
import { GridLoader } from "react-spinners";
import { isUserAdmin } from "../../Utilities/auth";
import { Link } from "react-router-dom";
import CardsContainer from "../Products/CardsContainer";
import { useNavigate } from 'react-router-dom';

const AdminPanelView = ({ setCartItemsQuantity, setSubTotal }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [showButton, setShowButton] = useState(true);
  const [transformY, setTransformY] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerHeight = 200;

    setShowButton(scrollY > 0);

    if (scrollY > triggerHeight) {
      const translateY = Math.min((scrollY - triggerHeight) / 4, 350);
      setTransformY(translateY);
    } else {
      setTransformY(0);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const fetchProducts = async () => {
    if (!isUserAdmin()) {
      navigate("/");
    }

    try {
      const response = await getFilteredElementsLazyLoading('/products/available-products', {}, page);
      setProducts(response.data);
      if (pageLimit !== response.totalPages) {
        setPageLimit(response.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const content = products.map((product, index) => (
    <CardAdmin
      key={index}
      product={product}
      refreshProducts={refreshProducts}
      setProducts={setProducts}
      setCartItemsQuantity={setCartItemsQuantity}
      setSubTotal={setSubTotal}
      _id={product._id}
    />
  ));

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container min-h-screen">
        <GridLoader color="#023fc5" />
      </div>
    );
  }

  return (
    <div className="container-product container">
      <div className="main-content">
        <CardsContainer className="cards-container" content={content} pages={pageLimit} setPage={setPage} />
        <Link to="/admin/add-product" className="add-product-link">
          +
        </Link>
      </div>
    </div>
  );
};

export default AdminPanelView;
