import React from 'react'
import { getElementByID } from '../../Components/ApiRestHandler/requestHandler';

export default function PurchaseComponent(props) {
  const order = getElementByID();
    
  return (
    <div>
        <section>
        <h2>Payment ID:</h2>
        <h2>Date:</h2>
        </section>
        <section>
        {props.products.map((product) => (
          <Link key={item.name} to={`${item.reactRoute}`}>
            <div key={item.id}>
              <img
                src={item.imagePath}
                alt={`offerImg-${item.id}`}
                className="img-responsive"
              />
            </div>
          </Link>
        ))}
        </section>
        <section>

        </section>
    </div>
  )
}
