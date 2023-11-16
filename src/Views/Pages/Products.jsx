import React, { useState, useEffect } from "react";
import CardsContainer from "../Products/CardsContainer";
import ShoppingCard from "../Products/ShoppingCard";
import { getElementsLazyLoading } from "../../Components/ApiRestHandler/requestHandler";
import Sidebar from "../Products/Sidebar";
import '../../css/Products.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

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
      <ShoppingCard
        _id={_id}
        img={imagePath[0]}
        title={name}
        price={price}
        colorInformation={colorInformation}
        size={size}
      />
    )
  );

  console.log("Page ",{page})
  console.log("Content:",{content})
  console.log("Products:",{products})

  return (
    <div className="container">
      <Sidebar />
      <CardsContainer content={content} />
    </div>
  );
};

export default Products;
