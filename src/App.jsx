import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ProductSection } from "./Pages/ProductSection";
import Home from "./Pages/Home/Home";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductSection />} />
            </Routes>
        </Router>
    );
}
