import React from 'react';
import { products } from '../data.jsx'; // Uvezite podatke o proizvodima iz data.jsx
import Card from './Card'; // Uvezite Card komponentu

export default function FeaturedProducts() {
    return (
        <section className="w-full px-6 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Istaknuti Proizvodi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} product={product} /> // Renderujte Card komponentu za svaki proizvod
                    ))}
                </div>
                {/* Dugme "Prikaži sve proizvode" na dnu */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => { window.location.href = '/proizvodi'; }}
                        className="bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg"
                    >
                        Prikaži sve proizvode
                    </button>
                </div>
            </div>
        </section>
    );
}