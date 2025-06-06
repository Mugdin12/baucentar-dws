import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WishlistIcon from '../components/WishlistIcon.jsx';
import { useAuth } from '../contexts/AuthContext';
import successGif from '../slike/7efs.gif';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';

export default function Card({ product }) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Stanje za kontrolu vidljivosti modalnog prozora i poruke
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleAddToCart = (e) => {
        e.preventDefault(); // Sprečava navigaciju cele kartice kada se klikne dugme

        if (!currentUser) {
            // Ako korisnik nije prijavljen, preusmeri ga na stranicu za prijavu
            navigate('/prijavi-se');
        } else {
            // Ako je korisnik prijavljen, ovde bi išla logika za dodavanje proizvoda u korpu
            console.log(`Proizvod "${product.name}" dodan u korpu (korisnik prijavljen).`);
            // Primer: addProductToCart(product);

            // Prikaz modalnog prozora o uspehu
            setModalMessage(`${currentUser.username || 'Korisniče'}, uspješno ste dodali "${product.name}" u korpu!`);
            setShowSuccessModal(true);
        }
    };

    // Funkcija za ručno zatvaranje modalnog prozora
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setModalMessage('');
    };

    return (
        <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] flex flex-col min-h-[420px] h-full">
            {/* WishlistIcon je izvan Linka, tako da klik na nju neće pokrenuti navigaciju */}
            <WishlistIcon
                productId={product.id}
                productName={product.name}
                positionClasses="absolute top-2 right-2 opacity-0 group-hover:opacity-100 z-20 pointer-events-auto"
                iconSize={24}
            />
            <Link
                to={`/proizvodi/${product.slug}`}
                className="flex flex-col flex-grow h-full"
                tabIndex={-1}
            >
                <img
                    src={product.imageUrl}
                    alt={product.alt}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/CCCCCC/666666?text=Slika+nije+učitana" }}
                />
                <div className="p-6 flex flex-col items-center text-center flex-grow w-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-lg font-bold mb-2">{product.price}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px] overflow-hidden w-full">{product.description}</p>
                    <div className="flex-grow" />
                    <button
                        onClick={handleAddToCart}
                        className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-auto"
                    >
                        Dodaj u Korpu
                    </button>
                </div>
            </Link>

            {/* Modalni prozor za uspeh dodavanja u korpu */}
            <AddToCartSuccessModal
                showModal={showSuccessModal}
                message={modalMessage}
                gifSrc={successGif}
                onClose={handleCloseModal}
            />
        </div>
    );
}