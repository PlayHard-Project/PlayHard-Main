import '../../css/HomeStyle.css'
import React, { useState } from 'react';
import { getElements } from '../../Components/ApiRestHandler/requestHandler';
import {ProductButtons} from "../ProductDescriptionSection/DeleteThisButton";
import BuyNowSection from "../HomePageSections/BuyNowSection";
import BrandsSection from "../HomePageSections/BrandsSection";
import OffersSection from '../HomePageSections/OffersSection';

export default function Home() {
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
        <div className="App container">
            <section>
                <BuyNowSection className="main-container"/>
            </section>
            <section>
                <BrandsSection/>
            </section>
            <section>
                <OffersSection/>
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

                <div className={'mt-20 flex flex-col gap-6'}>
                    <p>ESTOS BOTONES SOLO SIRVEN PARA EL TESTEO, LLEVARA A LA PAGINA DE 3 PRODUCTOS DIFERENTES</p>
                    <ProductButtons />
                </div>
            </header>
        </div>
    );
}