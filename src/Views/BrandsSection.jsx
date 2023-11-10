import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getElements } from "../Components/ApiRestHandler/requestHandler";
import {useEffect, useRef, useState} from "react";
import "./BrandsSection.css";
import {Link, Route, Routes} from "react-router-dom";

export default function BrandsSection() {
    const sliderRef = useRef();
    const [data, setData] = useState([]);
    const dataPromise = getElements('/brands');

    const goBrandProduct = () => {
        console.log("Change to products of the brand")
    }

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 9,
        slidesToScroll: 1,
        style: {float:  100, paddingRight: 5}
    };

    useEffect(() => {
        dataPromise.then(data => {
            setData(data)
        })
    }, []);


    return (
      <section className="brands-container">
          <div className="title-container">
            <h1 className="section-title">Brands</h1>
          </div>
          <Slider id="brand-slider" ref={sliderRef} {...sliderSettings}>
              {
                  data.map((item) => (
                      <div key={item._id} className="logo-container">
                          <img src={item.imagePath} className="brand-logo" alt={item.name + " logo"}/>
                      </div>
                  ))
              }
          </Slider>

          <style>
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
          </style>
      </section>
    );
}