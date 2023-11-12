import React, { useEffect, useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Recommendations.css";
import BasicCard from "./Card";
import { data } from "../../Components/Objects/RecommendationsContent";

export default function Recommendations() {
  const sliderRef = useRef();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          swipeToSlide: true,
        },
      },

      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 5000);

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
    </section>
  );
}