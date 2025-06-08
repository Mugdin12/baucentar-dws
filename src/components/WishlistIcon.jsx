import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function WishlistIcon({ productId, productName, iconSize = 24, positionClasses = "" }) {
    // Stanje za praćenje da li je proizvod dodan u listu želja
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Funkcija za prebacivanje statusa liste želja
    const toggleWishlist = (e) => {
        e.stopPropagation(); // Sprečava da klik na ikonu aktivira druge evente (npr. navigaciju kartice)
        setIsWishlisted(!isWishlisted);
        // Ovdje biste obično dodali logiku za spremanje/uklanjanje iz baze podataka ili globalnog stanja
        console.log(`Proizvod ID: ${productId}, Naziv: ${productName} je ${isWishlisted ? 'uklonjen iz' : 'dodan u'} listu želja.`);
    };

    return (
        <button
            onClick={toggleWishlist}
            // positionClasses prop omogućava pozicioniranje ikone (npr. "absolute top-2 right-2")
            className={`p-2 rounded-full bg-white bg-opacity-80 text-gray-700
                       hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-10 ${positionClasses}`}
            aria-label={isWishlisted ? "Ukloni iz liste želja" : "Dodaj u listu želja"}
        >
            {isWishlisted ? (
                <Heart size={iconSize} className="text-red-500 fill-current" /> // Ispunjen crveni srce
            ) : (
                <Heart size={iconSize} className="text-gray-500 hover:text-red-500" /> // Prazno sivo srce
            )}
        </button>
    );
}
