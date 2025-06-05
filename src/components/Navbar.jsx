import React, { useState, useEffect } from 'react'; // ✨ Dodan useEffect
import Logo from "../slike/logo.jpg" // Pretpostavka: logo.jpg je u src/slike/ folderu
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // ✨ Novo stanje za praćenje skrolovanja

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // ✨ Efekat za praćenje skrolovanja
    useEffect(() => {
        const handleScroll = () => {
            // Proverava da li je korisnik skrolovao više od 50px
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Čišćenje event listenera kada se komponenta unmountuje
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Prazan niz zavisnosti znači da se efekat pokreće samo jednom (on mount)

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out
            ${isScrolled ? 'py-2' : 'py-4'} // ✨ Menja padding (visinu) na osnovu skrolovanja
            ${isScrolled ? 'shadow-lg' : 'shadow-md'} // ✨ Menja senku na osnovu skrolovanja
            `}
        >
            <div className="flex items-center justify-between w-full px-6">
                {/* Lijevo: Logo */}
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Baucenter Logo"
                        className={`w-auto rounded-md transition-all duration-300 ease-in-out ${isScrolled ? 'h-10' : 'h-12'}`} // ✨ Menja visinu loga
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x40/0000FF/FFFFFF?text=Baucenter+Logo" }}
                    />
                </div>

                {/* Centar: Navigacioni Linkovi (Desktop) */}
                <div className="hidden md:flex space-x-8 flex-1 justify-center">
                    <a href="/" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Početna</a>
                    <a href="/o-nama" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">O nama</a>
                    <a href="/proizvodi" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Proizvodi</a>
                    <a href="/kontakt" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Kontakt</a>
                </div>

                {/* Desno: Autentifikacioni Linkovi (Desktop) */}
                <div className="hidden md:flex space-x-4 items-center">
                    <a href="/prijavi-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Prijavi se</a>
                    <a href="/registruj-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Registruj se</a>
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
                        <a href="/" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Početna</a>
                        <a href="/o-nama" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">O nama</a>
                        <a href="/proizvodi" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Proizvodi</a>
                        <a href="#" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Kontakt</a>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        <a href="/prijavi-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Prijavi se</a>
                        <a href="/registruj-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Registruj se</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
