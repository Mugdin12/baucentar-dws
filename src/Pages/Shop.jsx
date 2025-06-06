
import React, { useState, useEffect, useCallback } from 'react';
import { products as allProducts } from '../data'; // Preimenovan import da se ne preklapa
import Card from '../components/Card.jsx'; // Uvezite Card komponentu
import Navbar from '../components/Navbar'; // Uvezite Navbar komponentu
import Footer from '../components/Footer'; // Uvezite Footer komponentu
import ProductFilter from "../components/ProductsFilter.jsx";
import Pagination from '../components/Pagination.jsx'; // Uvezite Pagination komponentu

const PRODUCTS_PER_PAGE = 12; // Definišite koliko proizvoda po stranici želite

export default function Shop() {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [filters, setFilters] = useState({
        searchTerm: '',
        minPrice: null,
        maxPrice: null,
    });
    const [currentPage, setCurrentPage] = useState(1); // Novo stanje za trenutnu stranicu

    // Funkcija za obradu promjena filtera iz ProductFilter komponente
    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Resetujte stranicu na 1 kada se filteri promjene
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
        // Nakon filtriranja, osigurajte da trenutna stranica nije veća od ukupnog broja stranica
        // Ovo je važno ako filtriranje smanji broj proizvoda
        const newTotalPages = Math.ceil(currentFiltered.length / PRODUCTS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else if (newTotalPages === 0) {
            setCurrentPage(1); // Ako nema proizvoda, ostanite na prvoj stranici
        }
    }, [filters, currentPage]); // Efekat se pokreće svaki put kada se filteri promjene

    // Izračunajte proizvode za prikaz na trenutnoj stranici
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const productsToDisplay = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Izračunajte ukupan broj stranica
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    // Funkcija za promenu stranice
    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Skrolujte na vrh stranice pri promeni
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar />
            <main className="flex-grow w-full px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Svi Proizvodi</h1>

                    {/* Renderujte ProductFilter komponentu iznad proizvoda */}
                    <ProductFilter onFilterChange={handleFilterChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {productsToDisplay.length > 0 ? (
                            productsToDisplay.map((product) => (
                                <Card key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600 text-xl">Nema proizvoda koji odgovaraju vašim kriterijima pretrage.</p>
                        )}
                    </div>

                    {/* Renderujte Pagination komponentu */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
