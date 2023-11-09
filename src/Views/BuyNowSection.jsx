import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BuyNowSection.css";
import { data } from "../Components/Objects/CoverBuyNowSection";

export default function BuyNowSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="slider-container">
      <Slider {...sliderSettings}>
        {data.map((item) => (
          <div key={item.id} className="container-image">
            <img
              src={item.imgUrl}
              alt={`CoverImg-${item.id}`}
              className="responsive"
            />
          </div>
        ))}
      </Slider>
      <button className="buy-now">Buy Now</button>
    </section>
  );
}
