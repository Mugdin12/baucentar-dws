
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ✨ VAŽNO: Uvezite slike kao module. Putanje su relativne u odnosu na ovaj fajl.
// Pretpostavlja se da su slike smještene u 'src/slike/' folderu.
import slika1 from '../slike/slika1.jpg';
import slika2 from '../slike/slika2.jpg';
import slika3 from '../slike/slika3.jpg';

const images = [slika1, slika2, slika3];

export default function ImageGallery() {
    const [current, setCurrent] = useState(0);

    // Funkcija za prelazak na prethodni slajd
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Funkcija za prelazak na sledeći slajd
    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // ✨ Automatska promena slajdova svakih 4 sekunde
    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Promena svakih 4 sekunde

        // Čišćenje intervala kada se komponenta unmountuje
        return () => clearInterval(slideInterval);
    }, [current]); // current u zavisnostima osigurava da se interval resetuje kada se slajd promeni

    return (
        <div className="relative w-screen overflow-hidden">
            <div
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-cover bg-center relative" // Dodan 'relative' za pozicioniranje overlay-a
                style={{ backgroundImage: `url(${images[current]})` }}
            >
                {/* ✨ Uklonjen sloj za opacity preko slike. Slika će biti potpuno vidljiva. */}

                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 z-10">
                    {/* ✨ Tekst na bosanskom */}
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">Novi Proizvodi</h2>
                    <p className="text-white text-base sm:text-lg mb-4 drop-shadow-lg">Pogledajte naše najnovije električne alate</p>
                    <button className="bg-[#00a63e] hover:bg-green-600 text-white px-5 py-2 rounded-md w-fit shadow-lg">Kupite Sada</button>
                </div>

                {/* Dugme za prethodni slajd */}
                <button
                    onClick={prevSlide}
                    // ✨ Promenjen hover efekat za strelice
                    className="absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 text-white transition p-2 rounded-full bg-black bg-opacity-30 hover:bg-green-600 hover:bg-opacity-100"
                    aria-label="Prethodni slajd"
                >
                    <ChevronLeft size={24} /> {/* Povećana veličina ikone za bolju vidljivost */}
                </button>

                {/* Dugme za sledeći slajd */}
                <button
                    onClick={nextSlide}
                    // ✨ Promenjen hover efekat za strelice
                    className="absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 text-white transition p-2 rounded-full bg-black bg-opacity-30 hover:bg-green-600 hover:bg-opacity-100"
                    aria-label="Sledeći slajd"
                >
                    <ChevronRight size={24} /> {/* Povećana veličina ikone za bolju vidljivost */}
                </button>
            </div>
        </div>
    );
}
