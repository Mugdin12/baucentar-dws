import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Uvezite vašu Navbar komponentu
import Review from '../components/Review.jsx'
import ImageGallery from "../components/ImageGallery.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import Footer from "../components/Footer.jsx"
export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar /> {/* Renderujte vašu Navbar komponentu */}
            <ImageGallery/>
            <FeaturedProducts/>
            <Review/>
            <Footer/>
        </div>
    );
}
