import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added this import
import Logo from "../slike/logo.jpg";
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { currentUser, logout } = useAuth();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out
            ${isScrolled ? 'py-2' : 'py-4'}
            ${isScrolled ? 'shadow-lg' : 'shadow-md'}
            `}
        >
            <div className="flex items-center justify-between w-full px-6">
                {/* Lijevo: Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Baucenter Logo"
                            className={`w-auto rounded-md transition-all duration-300 ease-in-out ${isScrolled ? 'h-10' : 'h-12'}`}
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x40/0000FF/FFFFFF?text=Baucenter+Logo" }}
                        />
                    </Link>
                </div>

                {/* Centar: Navigacioni Linkovi (Desktop) */}
                <div className="hidden md:flex space-x-8 flex-1 justify-center">
                    <Link to="/" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Početna</Link>
                    <Link to="/o-nama" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">O nama</Link>
                    <Link to="/Shop" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Proizvodi</Link>
                    <Link to="/kontakt" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg">Kontakt</Link>
                </div>

                {/* Desno: Autentifikacioni Linkovi / Ikone (Desktop) */}
                <div className="hidden md:flex space-x-4 items-center">
                    {currentUser ? (
                        <>
                            <Link to="/kosarica" className="text-gray-700 hover:bg-green-600 hover:text-white transition-all px-3 py-2 rounded-lg">
                                <ShoppingCart size={24} />
                            </Link>
                            <Link to="/profil" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-3 py-2 rounded-lg flex items-center">
                                <User size={24} className="mr-1" />
                                {currentUser.username}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:bg-red-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg flex items-center"
                            >
                                <LogOut size={20} className="mr-1" /> Odjava
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/prijavi-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Prijavi se</Link>
                            <Link to="/registracija" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium transition-all px-4 py-2 rounded-lg">Registruj se</Link>
                        </>
                    )}
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
                        <Link to="/" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Početna</Link>
                        <Link to="/o-nama" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">O nama</Link>
                        <Link to="/Shop" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Proizvodi</Link>
                        <Link to="/kontakt" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg">Kontakt</Link>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        {currentUser ? (
                            <>
                                <Link to="/kosarica" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg flex items-center justify-center">
                                    <ShoppingCart size={24} className="mr-2" /> Košarica
                                </Link>
                                <Link to="/profil" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-3 rounded-lg flex items-center justify-center">
                                    <User size={24} className="mr-2" /> Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:bg-red-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg flex items-center justify-center"
                                >
                                    <LogOut size={20} className="mr-2" /> Odjava
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/prijavi-se" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Prijavi se</Link>
                                <Link to="/registracija" className="text-gray-700 hover:bg-green-600 hover:text-white font-medium w-full text-center py-2 px-4 rounded-lg">Registruj se</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}