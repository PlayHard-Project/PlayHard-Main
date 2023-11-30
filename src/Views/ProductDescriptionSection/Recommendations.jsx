import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Recommendations.css";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import BasicCard from "./Card";
import {GridLoader} from "react-spinners";

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
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          swipeToSlide: true,
        },
      },

      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 770,
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


  /**
   * Renders a loading component when there are no products to display.
   * @param {Array} products - The array of products to be checked for emptiness.
   * @returns {JSX.Element} - The JSX representing either the loading component or the product content.
   */
  if (products.length === 0) {
    return (
        <div
            className={
              "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container min-h-screen"
            }
        >
          {/* Display a loading spinner with the specified color */}
          <GridLoader color="#023fc5" />
        </div>
    );
  }

  return (
    <section className="slider-container">
      <section className="image-container">
        <h1 className="main-title">RECOMMENDED</h1>
        <Slider ref={sliderRef} {...sliderSettings}>
          {products.slice(indexZero, lastIndex).map((item) => {
            return (
                <BasicCard item={item} />
            );
          })}
        </Slider>
      </section>
    </section>
  );
}
