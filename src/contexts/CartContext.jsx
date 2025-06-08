import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('guestCart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Greška pri učitavanju korpe iz localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('guestCart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Greška pri čuvanju korpe u localStorage:", error);
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                return [
                    ...prevItems,
                    {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        priceValue: product.priceValue,
                        imageUrl: product.imageUrl,
                        quantity: quantity,
                    }
                ];
            }
        });
        console.log("Proizvod dodan/ažuriran u korpi:", product.name);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        console.log("Proizvod uklonjen iz korpe:", productId);
    };

    const updateCartItemQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            );
        });
        console.log("Količina proizvoda ažurirana:", productId, newQuantity);
    };

    //  Nova funkcija za pražnjenje korpe
    const clearCart = () => {
        setCartItems([]);
        console.log("Korpa je ispražnjena.");
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart, //  Dodana clearCart funkcija u value objekat
        totalItemsInCart: cartItems.reduce((total, item) => total + item.quantity, 0),
        totalCartPrice: cartItems.reduce((total, item) => total + (item.priceValue * item.quantity), 0).toFixed(2),
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
