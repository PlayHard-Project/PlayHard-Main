import React, { useEffect, useState } from "react";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import "../../css/CartComponent.css";
import { GridLoader } from "react-spinners";

const CartComponent = ({ productFromOrder, color }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const orderC = await getElementByID(productFromOrder.id, "/products");
        setProduct(orderC);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  return (
    <>
      {loading ? (
      <div className= {"flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container"}>
        <GridLoader color="#023fc5" />
      </div>
      ) : (
        <div className="product-container" key={productFromOrder._id}>
          <section className="image-section">
            <img
              className="img1"
              src={product.imagePath[0]}
              width="30px"
              alt="product_img.png"
            />
          </section>
          <section className="text-section1">
            <label className="sub-title1">Name</label>
            <label className="text1">{product.name}</label>
          </section>
          <section className="text-section1">
            <label className="sub-title1">Quantity</label>
            <label className="text1">{productFromOrder.quantity}</label>
          </section>
          <section className="text-section1">
            <label className="sub-title1">Color</label>
            <label className="text1">
              {product.colorInformation[color].color}
            </label>
          </section>
          <section className="text-section1">
            <label className="sub-title1">Unit Price</label>
            <label className="text1">{"$ " + product.price}</label>
          </section>
          <section className="text-section1">
            <label className="sub-title1">Total Price</label>
            <label className="text1">
              {"$ " + (product.price * productFromOrder.quantity).toFixed(2)}
            </label>
          </section>
        </div>
      )}
    </>
  );
};

export default CartComponent;
