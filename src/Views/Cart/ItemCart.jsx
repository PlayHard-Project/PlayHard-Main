import {useState} from "react";
import {getElementByID} from '../../Components/ApiRestHandler/requestHandler.js'
import '../../css/ItemCard.css'
import BuyCartManagement from "../../Utilities/BuyCartManagement";

const ItemCart = ( props ) => {
    const { productID, size, color, quantity, setCartItemsQuantity } = props;
    /*const data = getElementByID(productID, '/products');*/
    const dataPromise = getElementByID(productID, "/products");
    const [productImg, setProductImg] = useState("https://th.bing.com/th/id/OIP.xaADddZHWRoU3TbjEVGssQHaFj?pid=ImgDet&rs=1")
    const [productName, setProductName] = useState("Product Name");
    const [productPrice, setProductPrice] = useState("69.69");
    const [productSize, setProductSize] = useState("A size")
    const [productColor, setProductColor] = useState("A color")

    const [itemsOnStock, setItemsOnStock] = useState(1);
    const buyCartManagement = new BuyCartManagement();

    dataPromise.then(
        (product) => {
            setProductImg(product.colorInformation[color].imagePath);
            setProductName(product.name);
            setProductPrice(product.price);
            setProductSize(product.size[size]);
            setProductColor(product.colorInformation[color].color);
            setItemsOnStock(product.inStock[size][color]);
        }
    );
    let [productQuantity, setProductQuantity] = useState(quantity);
    const currency = "$";

    const incrementQuantity = () => {
        if (productQuantity + 1 <= itemsOnStock) {
            setProductQuantity(productQuantity + 1);
            buyCartManagement.incrementQuantity(productID, size, color);
        } else {
            alert("We don't have more on stock")
        }
    }

    const decrementQuantity = () => {
        if (productQuantity - 1 >= 1) {
            setProductQuantity(productQuantity - 1);
            buyCartManagement.decreaseQuantity(productID, size, color);
        }
    }

    const deleteItem = () => {
        buyCartManagement.deleteProduct(productID, size, color)
        setCartItemsQuantity(buyCartManagement.getProducts().length)
    }

    return (
        <section className="item-cart">
            <img className="product-img" src={productImg} alt={productName + " photography"}/>
            <div className="product-information">
                <label className="product-name">{productName}</label>
                <div className="size-part">
                    <label className="label">Size: </label>
                    <label className="information-label">{productSize}</label>
                </div>
                <div className="color-part">
                    <label className="label">Color: </label>
                    <label className="information-label">{productColor}</label>
                </div>
                <div className="price-part">
                    <label className="label">{currency}</label>
                    <label className="label">{productPrice}</label>
                </div>
                <div className="quantity-picker">
                    <button onClick={decrementQuantity} className="picker-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/56/56889.png" alt="plus icon"/>
                    </button>
                    <label className="quantity-label">{productQuantity}</label>
                    <button onClick={incrementQuantity} className="picker-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" alt="less icon"/>
                    </button>
                </div>
            </div>
            <img className="delete-icon" src="https://cdn-icons-png.flaticon.com/512/657/657059.png" alt="delete icon" onClick={deleteItem}/>
        </section>
    );
};

export default ItemCart;