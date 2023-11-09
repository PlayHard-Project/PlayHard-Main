import React, { useState } from 'react';
import { getElements } from './Components/ApiRestHandler/requestHandler';
import BuyNowSection from './Views/BuyNowSection';
import Footer from './Views/Footer/Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetProductsClick = () => {
    setLoading(true);

    getElements('/products')
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <section>
        <BuyNowSection className="main-container"/>
      </section>
      <header className="App-header">
        <p>DEVELOPMENT environment</p>
        <div>
          <h1>Tu Aplicación</h1>
          <h2>Obtener los Productos</h2>
          <button onClick={handleGetProductsClick} disabled={loading}>
            Get All Products
          </button>
        </div>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.name}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Precio: {product.price} {product.currency}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
      <Footer />
    </div>
  );
}