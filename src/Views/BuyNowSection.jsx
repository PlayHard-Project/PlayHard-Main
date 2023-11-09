import React, { useRef } from "react";
import "./BuyNowSection.css";
import { data } from "../Components/Objects/CoverBuyNowSection";

export default function BuyNowSection() {
  const listRefCovers = useRef();
  return (
    <section className="slider-container">
      <div className="container-image">
        <ul ref={listRefCovers}>
            {
                data.map((item) => {
                    return <li key ={item.id}>
                        <img src={item.imgUrl} alt="img" /> 
                    </li>
                })
            }
        </ul>
        <img
          src="https://i.postimg.cc/vZLC88NT/Group-100-1.png"
          alt="CoverImg"
          className="responsive"
        />
      </div>
      <button className="buy-now">Buy Now</button>
    </section>
  );
}
