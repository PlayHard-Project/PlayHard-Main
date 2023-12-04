import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import React, {useEffect, useRef, useState} from "react";
import "../../css/BrandsSection.css";
import {Link, useNavigate} from "react-router-dom";
import {GridLoader} from "react-spinners";

const BrandItem = ({ to, children }) => {
    const navigate = useNavigate();
    const [lastTap, setLastTap] = useState(0);

    const handleTouchStart = () => {
        const now = Date.now();
        if (now - lastTap < 300) {
            handleDoubleClick();
        } else {
            setLastTap(now);
        }
    };

    const handleDoubleClick = () => {
        navigate(to);
    };

    return (
        <div onDoubleClick={handleDoubleClick} onTouchStart={handleTouchStart}>
            {children}
        </div>
    );
};

export default function BrandsSection() {
    const sliderRef = useRef(null);
    const [data, setData] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(9);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        style: { float: 100, paddingRight: 5 },
        swipeToSlide: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 9,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                },
            },
        ],
    };

    useEffect(() => {
        const dataPromise = getElements('/brands');
        dataPromise.then((data) => {
            setData(data);
        });

        const interval = setInterval(() => {
            sliderRef.current?.slickNext();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    /**
     * Renders a loading component along with a title when there is no data available.
     * @param {Array} data - The array of data to be checked for emptiness.
     * @returns {JSX.Element} - The JSX representing the title and loading component.
     */
    if (data.length === 0) {
        return (
            <>
                {/* Title container with the "Brands" section title */}
                <div className="title-container">
                    <h1 className="section-title">Brands</h1>
                </div>
                {/* Loading component container with a loading spinner */}
                <div
                    className={
                        "flex flex-col items-center justify-center p-3 gap-16 container"
                    }
                >
                    <GridLoader color="#023fc5" />
                </div>
            </>
        );
    }

    return (
        <section className="brands-container">
            <div className="title-container">
                <h1 className="section-title">Brands</h1>
            </div>
            <Slider id="brand-slider" ref={sliderRef} {...sliderSettings}>
                {data.map((item) => (
                    <div key={item._id} className="logo-container">
                        <BrandItem to={'products/brand=' + item._id}>
                            <img
                                src={item.imagePath}
                                className="brand-logo"
                                alt={item.name + ' logo'}
                            />
                        </BrandItem>
                    </div>
                ))}
            </Slider>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
            </style>
        </section>
    );
}