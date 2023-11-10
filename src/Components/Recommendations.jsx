import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recommendations.css";
import BasicCard from "./Card";
import { data } from "../Components/Objects/RecommendationsContent";

export default function Recommendations() {
  const sliderRef = useRef();
  const [isTransitioning, setTransitioning] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    beforeChange: () => {
      setTransitioning(true);
    },
    afterChange: () => {
      setTransitioning(false);
    },
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },

      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
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
        <h1 className="main-title"> RECOMMENDED </h1>
        <Slider ref={sliderRef} {...sliderSettings}>
          {data?.map((item, index) => {
            return <BasicCard item={item} />;
          })}
        </Slider>
      </section>
      {!isTransitioning && (
      <>
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
            alt="Next"
          />
        </button>
      </>
    )}
    </section>
  );
}