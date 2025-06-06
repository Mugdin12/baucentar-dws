import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistIcon from './WishlistIcon';
import { useAuth } from '../contexts/AuthContext';
import successGif from '../slike/7efs.gif'; // Uvezite GIF datoteku
import AddToCartSuccessModal from './AddToCartSuccessModal'; // Uvezite novu komponentu

export default function ProductDisplay({ product }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Stanje za kontrolu vidljivosti modalnog prozora i poruke
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Funkcija za obradu klika na dugme "Dodaj u Korpu"
    const handleAddToCart = (e) => {
        e.preventDefault();

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

    // Funkcija za ručno zatvaranje modalnog prozora (proslijeđuje se novoj komponenti)
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setModalMessage('');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Slika proizvoda */}
            <div className="flex justify-center items-center">
                <img
                    src={product.imageUrl}
                    alt={product.alt}
                    className="max-w-full h-auto rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/666666?text=Slika+nije+učitana" }}
                />
            </div>

            {/* Korišćenje WishlistIcon komponente na ProductDetail stranici */}
            <WishlistIcon
                productId={product.id}
                productName={product.name}
                positionClasses="absolute top-4 right-4"
                iconSize={28}
            />

            {/* Detalji proizvoda */}
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
                <p className="text-green-600 text-2xl font-bold mb-4">{product.price}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                </p>
                {/* Dodatne informacije o proizvodu mogu ići ovdje */}
                <ul className="text-gray-600 mb-6 list-disc list-inside">
                    <li>Dostupno na stanju</li>
                    <li>Brza dostava za 2-3 radna dana</li>
                    <li>Garancija kvaliteta</li>
                </ul>
                <button
                    onClick={handleAddToCart}
                    className="bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg">
                    Dodaj u Korpu
                </button>
            </div>

            {/* Renderujte novu komponentu za modalni prozor */}
            <AddToCartSuccessModal
                showModal={showSuccessModal}
                message={modalMessage}
                gifSrc={successGif}
                onClose={handleCloseModal}
            />
        </div>
    );
}
