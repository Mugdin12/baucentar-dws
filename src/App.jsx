import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import ProductDetail from './Pages/ProductDetail.jsx'; // Uvezite ProductDetail komponentu

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/o-nama" element={<About />} />
                <Route path="/proizvodi" element={<Shop />} />
                <Route path="/proizvodi/:productName" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default App;