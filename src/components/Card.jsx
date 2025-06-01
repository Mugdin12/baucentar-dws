import React, { useState } from 'react';
// ✨ Uvezite samo ikonu Heart iz lucide-react, jer ćemo je koristiti za oba stanja
import { Heart } from 'lucide-react';

export default function Card({ product }) {
    // Stanje za praćenje da li je proizvod dodan u listu želja
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Funkcija za prebacivanje statusa liste želja
    const toggleWishlist = (e) => {
        e.stopPropagation(); // Sprečava da klik na ikonu aktivira klik na cijelu karticu (ako postoji)
        setIsWishlisted(!isWishlisted);
        // Ovdje biste obično dodali logiku za spremanje/uklanjanje iz baze podataka ili globalnog stanja
        console.log(`${product.name} je ${isWishlisted ? 'uklonjen iz' : 'dodan u'} listu želja.`);
    };

    return (
        // Dodana 'group' klasa kako bi se omogućio hover efekat na djeci
        <div key={product.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
            <img
                src={product.imageUrl}
                alt={product.alt}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/CCCCCC/666666?text=Slika+nije+učitana" }}
            />

            {/* ✨ Ikona za listu želja */}
            <button
                onClick={toggleWishlist}
                className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 text-gray-700
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-10" // Z-index da bude iznad slike
                aria-label={isWishlisted ? "Ukloni iz liste želja" : "Dodaj u listu želja"}
            >
                {isWishlisted ? (
                    // ✨ Ikona ispunjenog srca (crvena boja simulira ispunjenost)
                    <Heart size={24} className="text-red-500 fill-current" /> // Dodana fill-current klasa
                ) : (
                    // ✨ Ikona praznog srca (siva boja, hover crvena)
                    <Heart size={24} className="text-gray-500 hover:text-red-500" />
                )}
            </button>


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
