import React from "react";
import "../../css/OffersSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../../Components/fillDBScripts/FilledOffers.json";

export default function OffersSection() {
  return (
    <section className="slider-container1">
      <h1 className="title">Offers</h1>
      <section className="image-container1">
        {data.map((item, index) => (
          <div key={item.id}>
            <img src={item.imagePath} alt={`CoverImg-${item.id}`} className="responsive1" />
          </div>
        ))}
      </section>
    </section>
  );
}
