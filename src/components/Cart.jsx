// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
    const { cartItems, removeFromCart, updateCartItemQuantity, totalCartPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.productId} className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                            <div>
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-gray-600">{item.price}</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                                disabled={item.quantity <= 1}
                            >-</button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                                onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                            >+</button>
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-right mt-6">
                <span className="text-lg font-bold">Total: {totalCartPrice} KM</span>
            </div>
        </div>
    );
}