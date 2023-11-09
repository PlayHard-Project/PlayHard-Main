import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BuyNowSection.css";
import { data } from "../Components/Objects/CoverBuyNowSection";

export default function BuyNowSection() {
  const sliderRef = useRef();

  const sliderSettings = {
    dots: false, // Configuración para ocultar los puntos de navegación
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className="slider-container">
      <Slider ref={sliderRef} {...sliderSettings}>
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
      <div className="navigation-buttons">
        <button className="navigation-button prev" onClick={handlePrevClick}>
          Prev
        </button>
        <button className="navigation-button next" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <button className="buy-now">Buy Now</button>
    </section>
  );
}
