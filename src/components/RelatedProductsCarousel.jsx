import React, { useEffect, useState } from 'react';
import { products } from '../data.jsx'; // Uvezite podatke o svim proizvodima
import Card from './Card.jsx'; // Uvezite Card komponentu za prikaz povezanih proizvoda
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Uvezite ikone za navigaciju


export default function RelatedProductsCarousel({ currentProductId }) {
    // Filtrirajte trenutni proizvod iz liste da se ne ponavlja
    const relatedProducts = products.filter(p => p.id !== parseInt(currentProductId));

    // Ograničite broj povezanih proizvoda na 4-6 za prikaz u karuselu
    // Za demo, uzimamo prvih 6, možete implementirati složeniju logiku za "povezane"
    const displayProducts = relatedProducts.slice(0, 6);

    const [currentSlide, setCurrentSlide] = useState(0);

    // Prilagodite broj proizvoda po prikazu za različite veličine ekrana
    const getProductsPerView = () => {
        if (window.innerWidth >= 1024) return 4; // lg
        if (window.innerWidth >= 768) return 3; // md
        if (window.innerWidth >= 640) return 2; // sm
        return 1; // default za mobilne (jedna kartica po prikazu)
    };
    const [productsPerView, setProductsPerView] = useState(getProductsPerView());

    // Ažurirajte productsPerView kada se veličina prozora promijeni
    useEffect(() => {
        const handleResize = () => {
            setProductsPerView(getProductsPerView());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ukupan broj slajdova se bazira na broju proizvoda i koliko ih se prikazuje istovremeno
    const totalSlides = Math.ceil(displayProducts.length / productsPerView);

    // Automatsko pomjeranje slajdova
    useEffect(() => {
        if (displayProducts.length <= productsPerView) return; // Nema potrebe za slajdovanjem ako nema dovoljno proizvoda

        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 3000); // Svake 3 sekunde

        return () => clearInterval(slideInterval);
    }, [currentSlide, totalSlides, displayProducts.length, productsPerView]); // Dodan productsPerView u zavisnosti

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    if (displayProducts.length === 0) {
        return null; // Ne prikazuj karusel ako nema povezanih proizvoda
    }

    return (
        <section className="w-full px-6 py-12 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Možda će vam se svidjeti</h2>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            // ✨ Dodan gap-4 za razmak između kartica i uklonjen px-2 sa individualnih kartica
                            className="flex transition-transform duration-500 ease-in-out gap-4"
                            style={{ transform: `translateX(-${currentSlide * (100 / productsPerView)}%)` }} // Prilagodba za mobilni
                        >
                            {displayProducts.map((product) => (
                                <div
                                    key={product.id}
                                    // ✨ Uklonjen px-2, širina se sada dinamički postavlja na osnovu productsPerView
                                    className={`flex-shrink-0`}
                                    style={{ width: `${100 / productsPerView}%` }} // Dinamička širina kartice
                                >
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigacione strelice */}
                    {displayProducts.length > productsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-green-600 hover:text-white transition-colors z-20"
                                aria-label="Prethodni proizvod"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-green-600 hover:text-white transition-colors z-20"
                                aria-label="Sledeći proizvod"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
