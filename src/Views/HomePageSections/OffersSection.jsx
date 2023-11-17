import React, { useState, useEffect } from "react";
import "../../css/OffersSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";

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
  return (
    <section className="section-container">
      <h1 className="title-section">Offers</h1>
      <section className="covers-container">
        {products.map((item) => (
          <Link key={item.name} to={`/${item.reactRoute}`}>
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
