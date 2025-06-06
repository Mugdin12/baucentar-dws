import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WishlistIcon from './WishlistIcon.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import successGif from '../slike/7efs.gif';
import AddToCartSuccessModal from './AddToCartSuccessModal';

export default function Card({ product }) {
    const { currentUser } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate('/prijavi-se');
        } else {
            addToCart(product, 1);
            setModalMessage(`"${product.name}" added to cart!`);
            setShowSuccessModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setModalMessage('');
    };

    return (
        <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[420px] h-full">
            <WishlistIcon
                productId={product.id}
                productName={product.name}
                positionClasses="absolute top-2 right-2 opacity-0 group-hover:opacity-100 z-20 pointer-events-auto"
                iconSize={24}
            />
            <Link to={`/proizvodi/${product.slug}`} className="flex flex-col flex-grow h-full" tabIndex={-1}>
                <img
                    src={product.imageUrl}
                    alt={product.alt}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/666666?text=No+Image"; }}
                />
                <div className="p-6 flex flex-col items-center text-center flex-grow w-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-lg font-bold mb-2">{product.price}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px] overflow-hidden w-full">{product.description}</p>
                    <div className="flex-grow" />
                    <button
                        onClick={handleAddToCart}
                        className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </Link>
            <AddToCartSuccessModal
                showModal={showSuccessModal}
                message={modalMessage}
                gifSrc={successGif}
                onClose={handleCloseModal}
            />
        </div>
    );
}