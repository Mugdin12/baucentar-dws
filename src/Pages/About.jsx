import React from "react";
import { BadgeCheck, Handshake, Lightbulb } from "lucide-react";
import Navbar from '../components/Navbar.jsx'
import Review from "../components/Review.jsx"
import Footer from "../components/Footer.jsx"
import AboutBgImage from "../slike/About-bg.jpg"
export default function About() {
    return (
        <div className="font-sans">
            <Navbar/>
            {/* Hero Sekcija */}
            <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20 px-6 md:px-16">
                <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url(${AboutBgImage})` }}
                ></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="text-sm mb-2">Početna &gt; <span className="font-semibold">O nama</span></div>
                    <h1 className="text-4xl font-bold mb-2">O BauCenteru</h1>
                    <p className="text-lg">Zajedno gradimo bolju budućnost od 2025.</p>
                </div>
            </div>

            {/* Misija */}
            <div className="text-center px-6 py-16 md:px-20 bg-white">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Naša misija</h2>
                <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
                    U BauCenteru smo posvećeni pružanju visokokvalitetnih građevinskih materijala, alata i stručnosti kako bismo pomogli i profesionalcima i entuzijastima uradi-sam da ostvare svoje snove. Vjerujemo da svi zaslužuju pristup najboljim resursima za svoje projekte, bili oni veliki ili mali.
                </p>
            </div>

            {/* Vrijednosti */}
            <div className="bg-gray-100 py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Kvalitet */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="mb-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <BadgeCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Kvalitet</h3>
                    <p className="text-gray-600 text-sm">
                        Nabavljamo samo najkvalitetnije materijale i alate od provjerenih proizvođača širom svijeta, osiguravajući da svaki proizvod ispunjava naše stroge standarde.
                    </p>
                </div>

                {/* Integritet */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="mb-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Handshake className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Integritet</h3>
                    <p className="text-gray-600 text-sm">
                        Vjerujemo u pošten poslovni odnos, transparentno formiranje cijena i izgradnju dugoročnih odnosa s našim kupcima zasnovanih na povjerenju i međusobnom poštovanju.
                    </p>
                </div>

                {/* Inovacija */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="mb-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Inovacija</h3>
                    <p className="text-gray-600 text-sm">
                        Neprestano tražimo najnovija dostignuća u građevinskoj tehnologiji i tehnikama kako bismo našim kupcima pružili vrhunska rješenja za njihove projekte.
                    </p>
                </div>
            </div>
            <Review/>
            <Footer/>
        </div>
    );
}
