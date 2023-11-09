import React from "react";
import Slider from "react-slick";
import "./App.css";
import BasicCard from "./Card";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
}

export default function App() {
  const slider = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    // customPaging: function (i) {
    //   return <p>{i + 1}</p>;
    // },

    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0px", color:"#00237B" }}>
        RECOMMENDED
      </h1>

      <div style={{ margin: 20 }}>
        <button onClick={() => slider?.current?.slickPrev()}>Prev</button>
        <button
          style={{ marginLeft: 20 }}
          onClick={() => slider?.current?.slickNext()}
        >
          Next
        </button>
      </div>

      <Slider ref={slider} {...settings}>
        {products?.map((item, index) => {
          return <BasicCard item={item} />;
        })}
      </Slider>
    </div>
  );
}

const products = [
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },

  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
  {
    name: "zapatito zapatote",
    image: "https://cdn.pixabay.com/photo/2023/10/27/09/24/mountains-8344601_1280.jpg",
    price: "Bs. 140",
  },
];
