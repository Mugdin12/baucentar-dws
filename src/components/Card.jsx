import React from 'react';

export default function Card({ product }) {
    return (
        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
            <img
                src={product.imageUrl}
                alt={product.alt}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/CCCCCC/666666?text=Slika+nije+učitana" }}
            />
            <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-700 text-lg font-bold mb-2">{product.price}</p>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Dodaj u Korpu
                </button>
            </div>
        </div>
    );
}