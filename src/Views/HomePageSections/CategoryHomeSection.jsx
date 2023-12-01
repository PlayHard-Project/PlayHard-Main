import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { data } from "../../Components/Objects/CategoryHomeSection";
import "../../css/categoryHome.css";

const CategoryHomeSection = () => {
    const sliderRef = useRef();

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        if (sliderRef.current) {
            const interval = setInterval(() => {
                sliderRef.current.slickNext();
            }, 10000);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <section>
            <div className="title-container-2 mt-2">
                <h1 className="section-title-2">Categories</h1>
            </div>
            <Slider ref={sliderRef} {...settings}>
                {data.map((category) => (
                    <div key={category.id} className="slick-slide">
                        <Link to={`/products/categories=${category.name}`} key={category.id}>
                            <button className="relative overflow-hidden group">
                                <img
                                    src={category.imgUrl}
                                    alt={category.name}
                                    className="object-cover mb-14 transition-opacity duration-300 group-hover:opacity-70"
                                />
                            </button>
                        </Link>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default CategoryHomeSection;