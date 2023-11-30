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
            console.log("Double Click detected")
            handleDoubleClick();
        } else {
            setLastTap(now);
        }
    };

    const handleDoubleClick = () => {
        navigate(to);
        console.log(`Redirecting to ${to} on double-click`);
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

    const handleWindowSizeChange = () => {
        setSlidesToShow(calculateSlidesToShow());
    };

    const calculateSlidesToShow = () => {
        if (window.innerWidth >= 1200) {
            return 9;
        } else if (window.innerWidth >= 768) {
            return 7;
        } else {
            return 4;
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        style: { float: 100, paddingRight: 5 },
        swipeToSlide: true,
        arrows: false,
    };

    useEffect(() => {
        const dataPromise = getElements('/brands');
        dataPromise.then((data) => {
            setData(data);
            console.log(data);
        });

        const interval = setInterval(() => {
            sliderRef.current?.slickNext();
        }, 5000);

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleWindowSizeChange);
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
                        "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container"
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