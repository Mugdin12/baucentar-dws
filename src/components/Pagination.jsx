// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    // Ne prikazuj paginaciju ako postoji samo jedna stranica ili nijedna
    if (totalPages <= 1) {
        return null;
    }

    // Generiše niz brojeva stranica za prikaz
    const pageNumbers = [];
    // Prikazati ograničen broj stranica oko trenutne
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Prilagođavanje ako smo blizu kraja
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center space-x-2 mt-8 mb-4">
            {/* Dugme za prethodnu stranicu */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white shadow-md hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Prethodna stranica"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Dugme za prvu stranicu (ako nije u prikazanom opsegu) */}
            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-1 rounded-lg bg-white shadow-md hover:bg-green-600 hover:text-white transition-colors"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-gray-600">...</span>}
                </>
            )}

            {/* Brojevi stranica */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3 py-1 rounded-lg shadow-md transition-colors
                                ${currentPage === number ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                >
                    {number}
                </button>
            ))}

            {/* Dugme za poslednju stranicu (ako nije u prikazanom opsegu) */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-gray-600">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3 py-1 rounded-lg bg-white shadow-md hover:bg-green-600 hover:text-white transition-colors"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Dugme za sledeću stranicu */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white shadow-md hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Sledeća stranica"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
