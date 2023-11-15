import { useState, useEffect } from "react";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import BuyCartManagement from '../../Utilities/BuyCartManagement'

function ProductInformation({ productID, setCartItemsQuantity }) {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("---");
  const [selectSize, setSelectedSize] = useState("---");
  const [quantity, setQuantity] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const currency = "$"
  const [errorMessage, setErrorMessage] = useState("");

  const [buyCart, setBuyCart] = useState([]);
  const buyCartManagement = new BuyCartManagement();

  useEffect(() => {
    getElementByID(productID, "products")
      .then((data) => {
        setProduct(data);
        setActiveImg(data.imagePath[0]);
      })
      .catch((err) => console.error(err));
  }, [productID]);

  useEffect(() => {
    setBuyCart(buyCartManagement.getProducts())
  }, []);

  useEffect(() => {
    if (product && product.colorInformation.length === 0) {
      setSelectedColor('default');
    }
  }, [product]);


  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={
        "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container"
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
          {product.imagePath.map((images, index) => (
            <img
              src={images}
              key={index}
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

        <h5 className={"text-2xl font-semibold mb-10"}>{currency} {product.price}</h5>

        <div className={"gap-5"}>
          <span className={"text-gray-700"}>
            <span className={"font-bold text-blue-800"}>Talla:</span>{" "}
            {selectSize}
          </span>
          <div className={"flex flex-row gap-3 "}>
            {product.size.map((size, index) => (
              <button
                className={"bg-white px-3 py-2 border-2 border-blue-100"}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeIndex(index);
                  setQuantity(0);
                  setErrorMessage("")
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {product.colorInformation.length > 0 && (
            <div className={"gap-5"}>
              <span className={"text-gray-700"}>
                <span className={"font-bold text-blue-800"}>Color:</span>{" "}
                {selectedColor}
              </span>
              <div className={"flex flex-row gap-3 "}>
                {product.colorInformation.map((color, index) => (
                    <button
                        key={index}
                        style={{ backgroundColor: color.hex }}
                        className="border-2 rounded-full px-3 py-2 w-10 h-10"
                        onClick={() => {
                          setSelectedColor(color.color);
                          setColorIndex(index);
                          setActiveImg(color.imagePath);
                          setQuantity(0);
                          setErrorMessage("")
                        }}
                    ></button>
                ))}
              </div>
            </div>
        )}

        <div className={"flex flex-row gap-5 items-center"}>
          <div className={"flex flex-row items-center"}>
            <button
              className={
                "bg-gray-200 py-2 px-5 rounded-lg text-blue-800 text-3xl text-center"
              }
              onClick={() => {
                setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
                setErrorMessage("")
              }}
            >
              -
            </button>
            <span className={"py4 px-6 rounded-lg"}>{quantity}</span>
            <button
              className={
                "bg-gray-200 py-2 px-4 rounded-lg text-blue-800 text-3xl text-center"
              }
              onClick={() => {
                if (selectedColor !== "---" && selectSize !== "---") {
                  setQuantity((prevQuantity) => {
                    if (prevQuantity + 1 <= product.inStock[sizeIndex][colorIndex]) {
                      prevQuantity += 1;
                      setErrorMessage("");
                      return prevQuantity;
                    } else {
                      setErrorMessage("That's all we have in stock")
                      return prevQuantity;
                    }
                  })
                  setErrorMessage("")
                } else {
                  setErrorMessage("Please first select size and color.")
              }}}
            >
              +
            </button>
          </div>

          <button
            className={
              "bg-blue-800 text-white font-semibold py-3 px-6 block flex-grow" +
              " text-center hover:bg-blue-900"
            }
            onClick={() => {
              if (quantity !== 0 && selectedColor !== "---" && selectSize !== "---") {
                buyCartManagement.addProduct(productID, quantity, sizeIndex, colorIndex);
                const updatedCart = buyCartManagement.getProducts();
                setBuyCart(updatedCart);
                console.log(updatedCart); //TODO: ELIMINAR ESTA LINEA, EXISTE SOLO PARA EL TESTEO
                setCartItemsQuantity(buyCartManagement.getProducts().length)
                setQuantity(0)
                setSelectedColor('---')
                setSelectedSize('---')
                setErrorMessage("")
              }
            }}
          >
            Add to cart
          </button>
        </div>
        <label id="quantityErrorLabel" className="px-0 py-0 font-light text-red-800">{errorMessage}</label>
      </div>
    </div>
  );
}

export default ProductInformation;
