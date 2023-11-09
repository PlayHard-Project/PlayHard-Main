import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recommendations.css";
import BasicCard from "../Components/Objects/Card";

export default function Recommendations() {
  const sliderRef = useRef();
  const [isTransitioning, setTransitioning] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
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
          {products?.map((item, index) => {
            return <BasicCard item={item} />;
          })}
        </Slider>
      </section>
      {!isTransitioning}
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

const products = [
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },

  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
];