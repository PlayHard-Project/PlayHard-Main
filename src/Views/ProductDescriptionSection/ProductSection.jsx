import ProductInformation from "./productInformation";
import Recommendations from "./Recommendations";

import { useParams } from "react-router-dom";

export function ProductSection({setCartItemsQuantity, setSubTotal}) {
  const { id } = useParams();

  return (
    <div className={"flex flex-col items-center justify-center min-h-screen"}>
      <div className={"flex items-center justify-center max-w-7xl w-full px-4"}>
        <ProductInformation productID={id} setCartItemsQuantity={setCartItemsQuantity} setSubTotal={setSubTotal}/>
      </div>
      
      <div className="flex flex-col justify-center w-full mx-auto">
        <Recommendations />
      </div>
    </div>
  );
}
