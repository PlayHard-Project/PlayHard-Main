import { useState, useEffect } from "react";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import BuyCartManagement from '../../Utilities/BuyCartManagement'
import {GridLoader} from "react-spinners";
import toast from "react-hot-toast";

/**
 * This class provide the component in charge of managing the information of each product.
 * So, receive the following parameters:
 *
 * @param {string} productID - ID of the product related with its identifier on the database.
 * @param {function} setCartItemsQuantity - Method received from App.jsx class (Root) to update the quantity information of the cart from different components.
 * @param {function} setSubTotal - Method received from App.jsx class (Root) to update the subtotal information of the cart.
 * @returns {JSX.Element} - Component of React with information of each product.
 */
function ProductInformation({ productID, setCartItemsQuantity, setSubTotal }) {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState("---");
  const [selectSize, setSelectedSize] = useState("---");
  const [quantity, setQuantity] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const currency = "$"
  const buyCartManagement = new BuyCartManagement();

  /**
   * This method obtain the information of the product from the database and set local variables to render the view.
   */
  useEffect(() => {
    getElementByID(productID, "/products")
      .then((data) => {
        setProduct(data);
        setActiveImg(data.imagePath[0]);
      })
      .catch((err) => console.error(err));
  }, [productID]);

  /**
   * This method is a validation of an event that can occur if the product data don't have information about the colors.
   * Is set as "Default".
   */
  useEffect(() => {
    if (product && product.colorInformation.length === 0) {
      setSelectedColor('default');
    }
  }, [product]);

  /**
   * Renders a loading component while waiting for the product to load.
   * @param {Object} product - The product being awaited. If null, the loading component is displayed.
   * @returns {JSX.Element} - The JSX representing either the loading component or the product content.
   */
  if (product === null) {
    return (
        <div
            className={
              "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container min-h-screen"
            }
        >
          {/* Display a loading spinner with the specified color */}
          <GridLoader color="#023fc5" />
        </div>
    );
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
          alt={"product image"}
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
              alt={"product image"}
            />
          ))}
        </div>
      </div>

      <div className={"flex flex-col gap-4 lg:w-2/4"}>
        <div>
          <span className={"text-blue-300 font-semibold"}>
            Code: {productID}
          </span>
          <h2 className={"text-3xl font-bold"}>{product.name}</h2>
        </div>
        <p className={"text-gray-700"}>{product.description}</p>

        <h5 className={"text-2xl font-semibold mb-10"}>{currency} {product.price}</h5>

        <div className={"gap-5"}>
          <span className={"text-gray-700"}>
            <span className={"font-bold text-blue-800"}>Size:</span>{" "}
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
                        onClick={
                          /**
                           * This method manage the click event of the buttons to select colors
                           */
                          () => {
                          setSelectedColor(color.color);
                          setColorIndex(index);
                          setActiveImg(color.imagePath);
                          setQuantity(0);
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
              }}
            >
              -
            </button>
            <span className={"py4 px-6 rounded-lg"}>{quantity}</span>
            <button
              className={
                "bg-gray-200 py-2 px-4 rounded-lg text-blue-800 text-3xl text-center"
              }
              onClick={
                /**
                 * This method is used to validate the increment on the quantity on the products.
                 * Validates the stock of size and color selected, and also the quantity that is on the cart at the moment.
                 */
                () => {
                if (selectedColor !== "---" && selectSize !== "---") {
                  setQuantity((prevQuantity) => {
                    let quantityPreviousOrdered = buyCartManagement.getQuantityOrdered(productID, sizeIndex, colorIndex);
                    if ((prevQuantity + 1) + quantityPreviousOrdered <= product.inStock[sizeIndex][colorIndex]) {
                      prevQuantity += 1;
                      return prevQuantity;
                    } else {
                      toast('This product is sold out', {icon: '📉'})
                      return prevQuantity;
                    }
                  })
                } else {
                  toast("Please first select size and color", {icon: '👏'})
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
            onClick={
              /**
               * This method manage the event of "Add to cart" button.
               * When this button is clicked, the information selected by the user is validated and added to the cart.
               */
              () => {
              if (quantity !== 0 && selectedColor !== "---" && selectSize !== "---") {
                buyCartManagement.addProduct(productID, quantity, sizeIndex, colorIndex);
                setCartItemsQuantity(buyCartManagement.getProducts().length);
                setQuantity(0);
                setSelectedColor('---');
                setSelectedSize('---');
                const subTotalPromise = buyCartManagement.getSubTotal();
                subTotalPromise.then((element) => {
                  setSubTotal(element);
                })
              } else {
                toast("Please first select size, color and quantity", {icon: '👏'})
            }}}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
