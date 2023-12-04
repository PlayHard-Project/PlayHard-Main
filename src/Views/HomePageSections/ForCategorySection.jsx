import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../../css/BrandsSection.css'
import { Link } from "react-router-dom";
import { data } from "../../Components/Objects/ForCategoryImages";

const ForCategorySection = () => {
    const sliderRef = useRef();
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
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
            }, 8000);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <section>
            <div className="title-container mt-14">
                <h1 className="section-title">For</h1>
            </div>
            <Slider ref={sliderRef} {...settings}>
                {data.map((category) => (
                    <Link to={`/products/target=${category.name}`} key={category.id} className="m-4 relative overflow-hidden group">
                        <img
                            src={category.imgUrl}
                            alt={category.name}
                            className="object-cover mb-14 transition-opacity duration-300 group-hover:opacity-70"
                        />
                    </Link>
                ))}
            </Slider>
        </section>
    );
};

export default ForCategorySection;