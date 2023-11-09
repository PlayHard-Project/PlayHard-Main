import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ProductSection } from "./Pages/ProductSection";


{/* BORRAR ESTE COMPONENTE, SOLO ESTA PARA EL TESTEO*/}
function ProductButtons() {
    const productIds = ['654c436360c78adccb61fc21', '654c436360c78adccb61fc21', '654c436360c78adccb61fbec'];

    return (
        <div className={'flex flex-col items-center justify-center max-w-7xl'}>
            {productIds.map(id => (
                <Link key={id} to={`/product/${id}`}>
                    <button>Ir a producto {id}</button>
                </Link>
            ))}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <div className={'w-screen h-screen flex items-center justify-center'}>
                <Routes>
                    <Route path="/" element={<ProductButtons />} />
                    <Route path="/product/:id" element={<ProductSection />} />
                    {/* Tus otras rutas aquí */}
                </Routes>
            </div>
        </Router>
    );
}
