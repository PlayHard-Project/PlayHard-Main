import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getElements } from "../../Components/ApiRestHandler/requestHandler";
import {useEffect, useRef, useState} from "react";
import "../../css/BrandsSection.css";
import {Link, useNavigate} from "react-router-dom";

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
    const sliderRef = useRef();
    const [data, setData] = useState([]);
    const dataPromise = getElements('/brands');

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 9,
        slidesToScroll: 1,
        style: {float:  100, paddingRight: 5},
        swipeToSlide: true,
    };

    useEffect(() => {
        dataPromise.then(data => {
            setData(data)
        })

        const interval = setInterval(() => {
            sliderRef.current.slickNext();
        }, 5000);

        return () => clearInterval(interval);
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
                          <BrandItem to={"brands/" + item.name}>
                              <img src={item.imagePath} className="brand-logo" alt={item.name + " logo"}/>
                          </BrandItem>
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