import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const idx = prev.findIndex(item => item.productId === product.id);
            if (idx > -1) {
                const updated = [...prev];
                updated[idx].quantity += quantity;
                return updated;
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    priceValue: product.priceValue,
                    imageUrl: product.imageUrl,
                    quantity,
                }
            ];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const updateCartItemQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        totalItemsInCart: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalCartPrice: cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0).toFixed(2),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};