import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import ProductDetail from './Pages/ProductDetail.jsx'; // Uvezite ProductDetail komponentu
import ContactForm from "./Pages/ContactForm";
import SigninForm from "./Pages/SigninForm";
import SignupForm from "./Pages/SignupForm";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Cart from './Pages/Cart.jsx';
import AdminPanel from './pages/AdminPanel';
function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/o-nama" element={<About />} />
                        <Route path="/proizvodi" element={<Shop />} />
                        <Route path="/proizvodi/:productName" element={<ProductDetail />} />
                        <Route path="/kontakt" element={<ContactForm />} />
                        <Route path="/prijavi-se" element={<SigninForm />} />
                        <Route path="/registruj-se" element={<SignupForm />} />
                        <Route path="/kosarica" element={<Cart />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;