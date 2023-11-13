import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Recommendations.css";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import BasicCard from "./Card";

export default function Recommendations() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getElements("/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  let indexZero = Math.floor(Math.random() * products.length) + 1;
  if (indexZero > products.length - 6) indexZero = products.length - 6;
  const lastIndex = indexZero + 5;

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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider-container">
      <section className="image-container">
        <h1 className="main-title">RECOMMENDED</h1>
        <Slider ref={sliderRef} {...sliderSettings}>
          {products.slice(indexZero, lastIndex).map((item) => {
            return (
              <Link key={item._id} to={`/product/${item._id}`}>
                <BasicCard item={item} />
              </Link>
            );
          })}
        </Slider>
      </section>
    </section>
  );
}
