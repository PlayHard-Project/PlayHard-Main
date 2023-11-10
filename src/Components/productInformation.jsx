import { useState, useEffect } from "react";
import { getElementByID } from "./ApiRestHandler/requestHandler";

function ProductInformation({ productID }) {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("---");
  const [selectSize, setSelectedSize] = useState("---");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getElementByID(productID, "products")
      .then((data) => {
        setProduct(data);
        setActiveImg(data.imagePath[0]);
      })
      .catch((err) => console.error(err));
  }, [productID]);

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={
        "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center "
      }
    >
      <div
        className={"flex flex-col gap-6 lg:w-2/4 overflow-hidden md:max-w-md "}
      >
        <img
          src={activeImg}
          className={"w-full h-full aspect-square object-cover"}
          alt={"imagen del producto"}
        />
        <div className={"flex flex-row justify-between h-16 md:h-24"}>
          {product.imagePath.map((images) => (
            <img
              src={images}
              className={
                "h-16 w-16 md:h-24 md:w-24  rounded-md object-cover cursor-pointer"
              }
              onClick={() => setActiveImg(images)}
              alt={"imagen del producto"}
            />
          ))}
        </div>
      </div>

      <div className={"flex flex-col gap-4 lg:w-2/4"}>
        <div>
          <span className={"text-blue-300 font-semibold"}>
            Codigo: {productID}
          </span>
          <h2 className={"text-3xl font-bold"}>{product.name}</h2>
        </div>
        <p className={"text-gray-700"}>{product.description}</p>

        <h5 className={"text-2xl font-semibold mb-10"}>Bs {product.price}</h5>

        <div className={"gap-5"}>
          <span className={"text-gray-700"}>
            <span className={"font-bold text-blue-800"}>Talla:</span>{" "}
            {selectSize}
          </span>
          <div className={"flex flex-row gap-3 "}>
            {product.size.map((size) => (
              <button
                className={"bg-white px-3 py-2 border-2 border-blue-100"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={"gap-5"}>
          <span className={"text-gray-700"}>
            <span className={"font-bold text-blue-800"}>Color:</span>{" "}
            {selectedColor}
          </span>
          <div className={"flex flex-row gap-3 "}>
            {product.colorInformation.map((color) => (
              <button
                style={{ backgroundColor: color.hex }}
                className="border-2 rounded-full px-3 py-2 w-10 h-10"
                onClick={() => {
                  setSelectedColor(color.color);
                  setActiveImg(color.imagePath);
                }}
              ></button>
            ))}
          </div>
        </div>

        <div className={"flex flex-row gap-5 items-center"}>
          <div className={"flex flex-row items-center"}>
            <button
              className={
                "bg-gray-200 py-2 px-5 rounded-lg text-blue-800 text-3xl text-center"
              }
              onClick={() =>
                setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
              }
            >
              -
            </button>
            <span className={"py4 px-6 rounded-lg"}>{quantity}</span>
            <button
              className={
                "bg-gray-200 py-2 px-4 rounded-lg text-blue-800 text-3xl text-center"
              }
              onClick={() =>
                setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 5))
              }
            >
              +
            </button>
          </div>

          <a
            className={
              "bg-blue-800 text-white font-semibold py-3 px-6 block flex-grow" +
              " text-center hover:bg-blue-900"
            }
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
