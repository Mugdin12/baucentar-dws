// Shop.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { products as allProducts } from '../data'; // Preimenovan import da se ne preklapa
import Card from '../components/Card.jsx'; // Uvezite Card komponentu
import Navbar from '../components/Navbar'; // Uvezite Navbar komponentu
import Footer from '../components/Footer'; // Uvezite Footer komponentu
import ProductFilter from "../components/ProductsFilter.jsx"; // Ispravljen naziv fajla za ProductFilter

export default function Shop() {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [filters, setFilters] = useState({
        searchTerm: '',
        minPrice: null,
        maxPrice: null,
    });

    // Funkcija za obradu promjena filtera iz ProductFilter komponente
    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    // Efekat za filtriranje proizvoda kada se filteri promjene
    useEffect(() => {
        let currentFiltered = allProducts;

        // Filtriranje po terminu pretrage
        if (filters.searchTerm) {
            const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
            currentFiltered = currentFiltered.filter(
                (product) =>
                    product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                    product.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // Filtriranje po minimalnoj cijeni
        if (filters.minPrice !== null) {
            currentFiltered = currentFiltered.filter(
                (product) => product.priceValue >= filters.minPrice
            );
        }

        // Filtriranje po maksimalnoj cijeni
        if (filters.maxPrice !== null) {
            currentFiltered = currentFiltered.filter(
                (product) => product.priceValue <= filters.maxPrice
            );
        }

        setFilteredProducts(currentFiltered);
    }, [filters]); // Efekat se pokreće svaki put kada se filteri promjene

    // ✨ Ograničite prikaz na prvih 12 proizvoda
    const productsToDisplay = filteredProducts.slice(0, 12);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar />
            <main className="flex-grow w-full px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Svi Proizvodi</h1>

                    {/* Renderujte ProductFilter komponentu iznad proizvoda */}
                    <ProductFilter onFilterChange={handleFilterChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {productsToDisplay.length > 0 ? ( // ✨ Koristite productsToDisplay
                            productsToDisplay.map((product) => (
                                <Card key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600 text-xl">Nema proizvoda koji odgovaraju vašim kriterijima pretrage.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
