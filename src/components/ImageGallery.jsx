
import React, { useState, useEffect } from 'react';
// ✨ VAŽNO: Instalirajte lucide-react ako već niste: npm install lucide-react
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ✨ VAŽNO: Sada koristimo new URL() za eksplicitno dobijanje URL-a resursa.
// ✨ Putanje su relativne u odnosu na ovaj fajl.
// ✨ Pretpostavlja se da su slike smještene u 'src/slike/' folderu.
const slika1 = new URL('../slike/slika1.jpg', import.meta.url).href;
const slika2 = new URL('../slike/slika2.jpg', import.meta.url).href; // Provjerite putanju za slika2.jpg
const slika3 = new URL('../slike/slika3.jpg', import.meta.url).href;

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

    // ✨ Dodatni useEffect za logovanje putanje slike
    useEffect(() => {
        console.log("Trenutna putanja slike:", images[current]);
        // Sada bi trebalo da vidite pun URL (npr. http://localhost:5173/src/assets/slika1.hash.jpg)
    }, [current]);


    return (
        <div className="relative w-screen overflow-hidden">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative"> {/* Uklonjen bg-cover/bg-center */}
                {/* ✨ Korištenje <img> taga umjesto background-image */}
                <img
                    src={images[current]}
                    alt={`Slajd ${current + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>

                {/* Sadržaj (tekst i dugme) - postavljen iznad overlay-a */}
                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 z-20"> {/* ✨ Povećan z-index na z-20 */}
                    {/* ✨ Tekst na bosanskom */}
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">Novi Proizvodi</h2>
                    <p className="text-white text-base sm:text-lg mb-4 drop-shadow-lg">Pogledajte naše najnovije električne alate</p>
                    {/* ✨ Dodan onClick handler za dugme "Kupite Sada" da vodi na /Shop */}
                    <button
                        onClick={() => { window.location.href = '/proizvodi'; }} // Preusmjerava na /Shop
                        className="bg-[#00a63e] hover:bg-green-600 text-white px-5 py-2 rounded-md w-fit shadow-lg transition-colors"
                    >
                        Kupite Sada
                    </button>
                </div>

                {/* Dugme za prethodni slajd - postavljen iznad svega */}
                <button
                    onClick={prevSlide}
                    // ✨ Promenjen hover efekat za strelice
                    className="absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 text-white transition p-2 rounded-full bg-black bg-opacity-30 hover:bg-green-600 hover:bg-opacity-100 z-30" // ✨ Povećan z-index na z-30
                    aria-label="Prethodni slajd"
                >
                    <ChevronLeft size={24} /> {/* Povećana veličina ikone za bolju vidljivost */}
                </button>

                {/* Dugme za sledeći slajd - postavljen iznad svega */}
                <button
                    onClick={nextSlide}
                    // ✨ Promenjen hover efekat za strelice
                    className="absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 text-white transition p-2 rounded-full bg-black bg-opacity-30 hover:bg-green-600 hover:bg-opacity-100 z-30" // ✨ Povećan z-index na z-30
                    aria-label="Sledeći slajd"
                >
                    <ChevronRight size={24} /> {/* Povećana veličina ikone za bolju vidljivost */}
                </button>
            </div>
        </div>
    );
}
