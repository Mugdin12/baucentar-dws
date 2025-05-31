import React from 'react';
import Item1 from "../slike/Item1.jpg"; //
import Item2 from "../slike/Item2.jpg";
import Item3 from "../slike/Item3.jpg";
import Item4 from "../slike/Item4.jpg";
import Item5 from "../slike/Item5.jpg";
import Item7 from "../slike/Item7.jpg";

export default function FeaturedProducts() {
    // Podaci za istaknute proizvode
    const products = [
        {
            id: 1,
            name: "Udarna Bušilica",
            price: "129.99 KM",
            imageUrl: Item1,
            alt: "Udarna Bušilica",
            description: "Snažna bušilica za sve vaše građevinske projekte, idealna za profesionalce i hobiste.", // ✨ Dodan opis
        },
        {
            id: 2,
            name: "Set Ručnih Alata",
            price: "59.50 KM",
            imageUrl: Item3,
            alt: "Set Ručnih Alata",
            description: "Kompletan set alata za svaku kućnu popravku, neophodan u svakoj radionici.", // ✨ Dodan opis
        },
        {
            id: 3,
            name: "Komplet vrtnog crijeva",
            price: "15.00 KM",
            imageUrl: Item2,
            alt: "Komplet vrtnog crijeva",
            description: "Izdržljivo rastezljivo baštensko crevo s podesivom mlaznicom i brzim priključcima", // ✨ Dodan opis
        },
        {
            id: 4,
            name: "Električna kosilica za travu",
            price: "189.99 KM",
            imageUrl: Item4,
            alt: "Električna kosilica za travu",
            description: "Baterijska električna kosilica za travu s podesivom visinom rezanja i torbom za skupljanje trave", // ✨ Dodan opis
        },
        {
            id: 5,
            name: "Komplet valjaka za boju",
            price: "19.99 KM",
            imageUrl: Item5,
            alt: "Komplet valjaka za boju",
            description: "Potpuni komplet valjaka za bojenje s produžnom drškom i raznim veličinama valjaka za sve površine", // ✨ Dodan opis
        },
        {
            id: 6,
            name: "Automatski zalijevač biljaka",
            price: "34.50 KM",
            imageUrl: Item7,
            alt: "Automatski zalijevač biljaka",
            description: "Sistem za samo zalijevanje biljaka s podesivim protokom.", // ✨ Dodan opis
        },
    ];

    return (
        <section className="w-full px-6 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Istaknuti Proizvodi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
                            <img
                                src={product.imageUrl}
                                alt={product.alt}
                                className="w-full h-48 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/CCCCCC/666666?text=Slika+nije+učitana" }}
                            />
                            <div className="p-6 flex flex-col items-center text-center"> {/* ✨ Dodan text-center za poravnanje */}
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-700 text-lg font-bold mb-2">{product.price}</p>
                                <p className="text-gray-600 text-sm mb-4">{product.description}</p> {/* ✨ Dodan opis proizvoda */}
                                <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Dodaj u Korpu
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ✨ Dugme "Prikaži sve proizvode" na dnu */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => { window.location.href = '/Shop'; }}
                        className="bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg"
                    >
                        Prikaži sve proizvode
                    </button>
                </div>
            </div>
        </section>
    );
}

