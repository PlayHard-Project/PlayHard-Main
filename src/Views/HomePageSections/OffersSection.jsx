import React, { useState, useEffect } from "react";
import "../../css/OffersSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import {GridLoader} from "react-spinners";

export default function OffersSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getElements("offers")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);


    if (products.length === 0) {
        return <div
            className={
                "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container"
            }
        >
            <GridLoader color="#023fc5" />
        </div>
    }

  return (
    <section className="section-container">
      <h1 className="title-section">Offers</h1>
      <section className="covers-container">
        {products.map((item) => (
          <Link key={item.name} to={`${item.reactRoute}`}>
            <div key={item.id}>
              <img
                src={item.imagePath}
                alt={`offerImg-${item.id}`}
                className="img-responsive"
              />
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}
