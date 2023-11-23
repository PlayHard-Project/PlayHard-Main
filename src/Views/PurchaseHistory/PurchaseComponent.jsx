import React from 'react';
import { getElementByID } from '../../Components/ApiRestHandler/requestHandler';

export default function PurchaseComponent(props) {
  const order = getElementByID(props.idOrder);

  return (
    <div>
      <section>
        <h2>Payment ID: {order.paymentIntentId}</h2>
        <h2>Date: {order.date}</h2>
        <div>
          {order.products.map(productFromOrder => (
            <div key={productFromOrder.id}>
              <h2>{productFromOrder.name}</h2>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
