import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDisplay from '../components/ProductDisplay.jsx';
import RelatedProductsCarousel from '../components/RelatedProductsCarousel';

export default function ProductDetail() {
    const { productName } = useParams();

    const product = products.find(p => p.slug === productName);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
                <Navbar />
                <main className="flex-grow w-full px-6 py-12 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Proizvod nije pronađen!</h1>
                        <p className="text-gray-700">Traženi proizvod ne postoji ili je uklonjen.</p>
                        <button
                            onClick={() => window.history.back()}
                            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                        >
                            Nazad na proizvode
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar />
            <main className="flex-grow w-full px-6 py-12">
                <ProductDisplay product={product} />
            </main>
            <RelatedProductsCarousel currentProductId={product.id} />
            <Footer />
        </div>
    );
}
