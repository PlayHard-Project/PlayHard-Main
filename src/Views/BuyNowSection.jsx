import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/BuyNowSection.css";
import { data } from "../Components/Objects/CoverBuyNowSection";

export default function BuyNowSection() {
  const sliderRef = useRef();
  const [isTransitioning, setTransitioning] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: () => {
      setTransitioning(true);
    },
    afterChange: () => {
      setTransitioning(false);
    },
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider-container">
      <section className="image-container">
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
      </section>
      {!isTransitioning && (
        <button className={`buy-now ${isTransitioning ? "hidden-button" : ""}`}> Buy Now </button>)}
      <button className="navigation-button-prev" onClick={handlePrevClick}>
        <img
          className="arrow-icon"
          src="https://i.postimg.cc/sD4Y649N/iconmonstr-arrow-64-240.png"
          alt="Previous"
        />
      </button>
      <button className="navigation-button-next" onClick={handleNextClick}>
        <img
          className="arrow-icon"
          src="https://i.postimg.cc/mgZQ01m2/iconmonstr-arrow-63-240.png"
          alt="Previous"
        />
      </button>
    </section>
  );
}
