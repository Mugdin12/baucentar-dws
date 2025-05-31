import React from 'react';
import Navbar from '../components/Navbar.jsx'; // Dodavanje Navbar komponentu

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar /> {/* Renderujte vašu Navbar komponentu */}

            {/* Primjer sadržaja početne stranice */}
            {/* ✨ Uklonjen 'container mx-auto' za punu širinu. Dodan 'w-full' i 'px-6' za padding. */}
            {/* ✨ 'flex-grow' da zauzme preostali vertikalni prostor */}
            {/* ✨ 'flex items-center justify-center' za centriranje sadržaja unutar main taga */}
            <main className="w-full px-6 flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center text-gray-800">Dobrodošli u Baucenter!</h1>
                <p className="text-lg text-center text-gray-600 mt-4 max-w-2xl">
                    Ovo je početna stranica vaše aplikacije. Sada bi trebala da se proteže preko cijelog ekrana
                    i da je sadržaj fino raspoređen.
                </p>
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        Saznajte Više
                    </button>
                </div>
            </main>
        </div>
    );
}
