import React from 'react';
// ✨ Uvezite ikone iz lucide-react. Ako lucide-react nije instaliran, pokrenite: npm install lucide-react
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'; // Dodane nove ikone

export default function Footer() {
    const currentYear = new Date().getFullYear(); // Dobija trenutnu godinu za copyright

    return (
        <footer className="w-full bg-gray-200 py-12 px-6 text-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                {/* Kolona 1: Brzi linkovi */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Brzi Linkovi</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Početna</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">O nama</a></li>
                        <li><a href="/Shop" className="hover:text-blue-600 transition-colors">Proizvodi</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Kontakt</a></li>
                    </ul>
                </div>

                {/* Kolona 2: Kontakt informacije */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Kontaktirajte Nas</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center justify-center md:justify-start">
                            <MapPin size={18} className="mr-2 text-gray-600" />
                            <span>Ulica Branka Ćopića 10, Sarajevo</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <Phone size={18} className="mr-2 text-gray-600" />
                            <span>+387 33 123 456</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <Mail size={18} className="mr-2 text-gray-600" />
                            <span>info@baucenter.ba</span>
                        </li>
                    </ul>
                </div>

                {/* Kolona 3: Društvene mreže i Copyright */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6">
                    {/* Logoi društvenih mreža */}
                    <div className="flex space-x-6">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                            <Facebook size={30} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600 transition-colors">
                            <Instagram size={30} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700 transition-colors">
                            <Linkedin size={30} />
                        </a>
                    </div>
                    {/* Copyright informacija */}
                    <p className="text-sm">
                        &copy; {currentYear} Baucenter. Sva prava zadržana.
                    </p>
                </div>
            </div>
        </footer>
    );
}
