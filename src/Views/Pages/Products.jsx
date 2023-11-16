import React, { useState, useEffect } from "react";
import CardsContainer from "../Products/CardsContainer";
import ShoppingCard from "../Products/ShoppingCard";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import Sidebar from "../Products/Sidebar";

const Products = () => {
  const [databaseProducts, setProducts] = useState([]);

  useEffect(() => {
    getElements("/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const content = databaseProducts.map(
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
      <Sidebar />
      <CardsContainer content={content} />
    </div>
  );
};

export default Products;
