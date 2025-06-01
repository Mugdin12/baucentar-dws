import React from 'react';
import { products } from '../data'; // Uvezite podatke o proizvodima iz data.jsx
import Card from '../components/Card.jsx'; // Uvezite Card komponentu
import Navbar from '../components/Navbar'; // Uvezite Navbar komponentu
import Footer from '../components/Footer'; // Uvezite Footer komponentu

export default function Shop() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24"> {/* pt-24 za fiksni navbar */}
            <Navbar /> {/* Prikaz Navbara na Shop stranici */}
            <main className="flex-grow w-full px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Svi Proizvodi</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> {/* Prilagođen grid za više proizvoda */}
                        {products.map((product) => (
                            <Card key={product.id} product={product} /> // Renderujte Card komponentu za svaki proizvod
                        ))}
                    </div>
                </div>
            </main>
            <Footer /> {/* Prikaz Footera na Shop stranici */}
        </div>
    );
}
