import React, { useState, useEffect } from "react";
import CardsContainer from "../Products/CardsContainer";
import ShoppingCard from "../Products/ShoppingCard";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import Sidebar from "../Products/Sidebar/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getElements("/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

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

  return (
    <div className="container">
      {/*<Sidebar />*/}
      <CardsContainer content={content} />
      {/* Filters and all products */}
    </div>
  );
};

export default Products;
