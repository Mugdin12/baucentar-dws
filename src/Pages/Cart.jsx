import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
    const { cartItems, removeFromCart, updateCartItemQuantity, totalCartPrice, totalItemsInCart, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [orderMessage, setOrderMessage] = useState(null);

    const handlePlaceOrder = async () => {
        if (!currentUser) {
            setOrderMessage("Morate biti prijavljeni da biste poslali narudžbu.");
            return;
        }
        if (cartItems.length === 0) {
            setOrderMessage("Vaša korpa je prazna. Dodajte proizvode pre nego što pošaljete narudžbu.");
            return;
        }

        const orderData = {
            userId: currentUser.uid,
            username: currentUser.username,
            totalItems: totalItemsInCart,
            totalPrice: totalCartPrice,
            items: cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl
            })),
            orderDate: new Date().toISOString(),
            status: "Pending"
        };

        try {
            const response = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`Greška pri slanju narudžbine: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Narudžbina uspešno poslata:", result);
            setOrderMessage("Vaša narudžbina je uspešno poslata! Hvala vam na kupovini.");
            clearCart();
            setTimeout(() => setOrderMessage(null), 5000);

        } catch (error) {
            console.error("Greška pri slanju narudžbine:", error);
            setOrderMessage(`Greška: ${error.message}. Molimo pokušajte ponovo.`);
            setTimeout(() => setOrderMessage(null), 5000);
        }
    };


    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Vaša Korpa</h2>
                    <p className="text-gray-700 text-lg">Vaša korpa je prazna.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Vaša Korpa</h2>
                {orderMessage && (
                    <div className={`p-3 mb-4 rounded-lg text-center font-medium ${orderMessage.startsWith("Greška") ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {orderMessage}
                    </div>
                )}
                <ul className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                        <li key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4"> {/* Ažurirano: flex-col na malim, flex-row na sm */}
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto"> {/* Ažurirano: width full na malim, mb-4 za razmak */}
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                                <div className="flex-grow"> {/* Ažurirano: flex-grow za ime/cenu */}
                                    <div className="font-semibold text-xl text-gray-800">{item.name}</div>
                                    <div className="text-green-600 text-lg font-bold mt-1">{item.price}</div>
                                </div>
                            </div>
                            {/* Ažurirano: Prilagođen layout za dugmad na manjim ekranima */}
                            <div className="flex items-center justify-between sm:justify-start space-x-3 w-full sm:w-auto">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-xl font-semibold"
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span className="px-3 text-lg font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-xl font-semibold"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-md flex-shrink-0" /* Dodano: flex-shrink-0 */
                                >Ukloni</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-200 space-y-4 sm:space-y-0"> {/* Ažurirano: flex-col na malim, space-y */}
                    <span className="text-xl font-bold text-gray-800">Ukupno stavki: {totalItemsInCart}</span>
                    <span className="text-2xl font-bold text-green-700">Ukupna cena: {totalCartPrice} KM</span>
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                    >
                        Plati
                    </button>
                </div>
            </div>
        </div>
    );
}
