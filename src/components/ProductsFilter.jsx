// src/components/ProductFilter.jsx
import React, { useState, useEffect, useRef } from 'react'; // Dodan useRef
import { Search } from 'lucide-react'; // Uvezite ikonu za pretragu

export default function ProductFilter({ onFilterChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Koristimo useRef da bismo dobili stabilnu referencu na onFilterChange
    // Ovo je dobra praksa kada onFilterChange dolazi kao prop
    const onFilterChangeRef = useRef(onFilterChange);
    useEffect(() => {
        onFilterChangeRef.current = onFilterChange;
    }, [onFilterChange]);


    // Koristimo useEffect sa debounce-om za slanje filtera
    // Ovo sprečava prečesto pozivanje onFilterChange dok korisnik kuca
    useEffect(() => {
        const handler = setTimeout(() => {
            let finalMinPrice = minPrice === '' ? null : Number(minPrice);
            let finalMaxPrice = maxPrice === '' ? null : Number(maxPrice);

            // ✨ Validacija: Onemogući negativne brojeve
            if (finalMinPrice !== null && finalMinPrice < 0) finalMinPrice = 0;
            if (finalMaxPrice !== null && finalMaxPrice < 0) finalMaxPrice = 0;

            // ✨ Validacija: Maksimalna cijena ne može biti manja od minimalne
            if (finalMinPrice !== null && finalMaxPrice !== null && finalMaxPrice < finalMinPrice) {
                finalMaxPrice = finalMinPrice; // Postavi max na min ako je manji
            }

            onFilterChangeRef.current({
                searchTerm,
                minPrice: finalMinPrice,
                maxPrice: finalMaxPrice,
            });
        }, 500); // Debounce od 500ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, minPrice, maxPrice]); // onFilterChange je uklonjen iz zavisnosti jer koristimo ref

    // Handler za minPrice input
    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        // Dozvoljava prazan string ili validan broj
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setMinPrice(value);
        }
    };

    // Handler za maxPrice input
    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        // Dozvoljava prazan string ili validan broj
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setMaxPrice(value);
        }
    };

    return (
        <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Tražilica */}
            <div className="relative flex-grow w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Pretražite proizvode..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Filter cijena */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Min. cijena input sa KM oznakom */}
                <div className="relative w-full sm:w-auto">
                    <input
                        type="number"
                        placeholder="Min. cijena"
                        className="w-full sm:w-auto px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        min="0"
                    />
                    {minPrice !== '' && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">KM</span>
                    )}
                </div>

                {/* Maks. cijena input sa KM oznakom */}
                <div className="relative w-full sm:w-auto">
                    <input
                        type="number"
                        placeholder="Maks. cijena"
                        className="w-full sm:w-auto px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        min="0"
                    />
                    {maxPrice !== '' && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">KM</span>
                    )}
                </div>
            </div>
        </div>
    );
}
