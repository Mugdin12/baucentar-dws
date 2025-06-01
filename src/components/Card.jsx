import React from 'react';
import { Link } from 'react-router-dom';
import WishlistIcon from '../components/WishlistIcon.jsx';

export default function Card({ product }) {
    return (
        <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] flex flex-col min-h-[420px]">
            <Link
                to={`/proizvodi/${product.slug}`}
                className="flex flex-col flex-grow h-full"
                tabIndex={-1} // Prevents focus on Link when clicking the heart
            >
                <img
                    src={product.imageUrl}
                    alt={product.alt}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/CCCCCC/666666?text=Slika+nije+učitana" }}
                />
                <div className="p-6 flex flex-col items-center text-center flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-lg font-bold mb-2">{product.price}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px] overflow-hidden">{product.description}</p>
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-auto"
                    >
                        Dodaj u Korpu
                    </button>
                </div>
            </Link>
            {/* WishlistIcon is outside the Link, so clicking it won't trigger navigation */}
            <WishlistIcon
                productId={product.id}
                productName={product.name}
                positionClasses="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                iconSize={24}
            />
        </div>
    );
}