import React, { useState } from 'react';
import Logo from "../slike/logo.jpg"

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="bg-white shadow-md py-4 w-full relative z-50">
            <div className="flex items-center justify-between w-full px-6">
                {/* Lijevo: Logo */}
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Baucenter Logo"
                        className="h-12 w-auto rounded-md"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x40/0000FF/FFFFFF?text=Baucenter+Logo" }}
                    />
                </div>

                {/* Centar: Navigacioni Linkovi (Desktop) */}
                <div className="hidden md:flex space-x-8 flex-1 justify-center">
                    {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                    <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Početna</a>
                    <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">O nama</a>
                    <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Kontakt</a>
                </div>

                {/* Desno: Autentifikacioni Linkovi (Desktop) */}
                <div className="hidden md:flex space-x-4 items-center">
                    {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                    <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Prijavi se</a>
                    {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                    <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Registruj se</a>
                </div>

                {/* Dugme za Mobilni Meni (Hamburger ikona) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobilni Meni (Dropdown) */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50 py-4 border-t border-gray-200">
                    <div className="flex flex-col items-center space-y-4">
                        {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Početna</a>
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">O nama</a>
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Kontakt</a>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Prijavi se</a>
                        {/* ✨ Dodane klase za hover efekat i padding za bolji vizuelni prikaz */}
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Registruj se</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
