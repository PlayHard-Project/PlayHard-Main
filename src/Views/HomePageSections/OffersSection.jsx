import React from "react";
import "../../css/OffersSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../../Components/fillDBScripts/FilledOffers.json";
import {Link} from "react-router-dom";

export default function OffersSection() {
  return (
    <section className="section-container">
      <h1 className="title-section">Offers</h1>
      <section className="covers-container">
        {data.map((item) => (
          <Link key={item.name} to={`/product/${item.idProduct}`}>
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
