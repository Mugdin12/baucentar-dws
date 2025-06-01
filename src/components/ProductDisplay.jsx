import React from 'react';
import WishlistIcon from './WishlistIcon'; // Uvezite novu WishlistIcon komponentu

export default function ProductDisplay({ product }) {
    return (
        // Dodana 'relative' klasa na glavni div za pozicioniranje ikone
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Slika proizvoda */}
            <div className="flex justify-center items-center">
                <img
                    src={product.imageUrl}
                    alt={product.alt}
                    className="max-w-full h-auto rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/666666?text=Slika+nije+učitana" }}
                />
            </div>

            {/* Korišćenje WishlistIcon komponente na ProductDetail stranici */}
            <WishlistIcon
                productId={product.id}
                productName={product.name}
                positionClasses="absolute top-4 right-4" // Klase za pozicioniranje (bez hover efekta jer je uvijek vidljiva)
                iconSize={28} // Veća ikona za detalje
            />

            {/* Detalji proizvoda */}
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
                <p className="text-green-600 text-2xl font-bold mb-4">{product.price}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                </p>
                {/* Dodatne informacije o proizvodu mogu ići ovdje */}
                <ul className="text-gray-600 mb-6 list-disc list-inside">
                    <li>Dostupno na stanju</li>
                    <li>Brza dostava za 2-3 radna dana</li>
                    <li>Garancija kvaliteta</li>
                </ul>
                <button className="bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg">
                    Dodaj u Korpu
                </button>
            </div>
        </div>
    );
}