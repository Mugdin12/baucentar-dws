import React, { createContext, useContext, useState } from 'react';

// Kreiranje konteksta za autentifikaciju
const AuthContext = createContext(null);

// Custom hook za lakši pristup kontekstu
export const useAuth = () => {
    return useContext(AuthContext);
};

// Komponenta provajdera autentifikacije
export const AuthProvider = ({ children }) => {
    // Stanje za trenutno prijavljenog korisnika (null ako niko nije prijavljen)
    const [currentUser, setCurrentUser] = useState(() => {
        // Pokušaj učitavanja korisnika iz localStorage-a pri inicijalizaciji
        try {
            const storedUser = localStorage.getItem('currentUser');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Greška pri učitavanju korisnika iz localStorage:", error);
            return null;
        }
    });

    // Funkcija za prijavu korisnika
    const login = (userData) => {
        setCurrentUser(userData);
        // Sačuvaj korisničke podatke u localStorage-u (za persistenciju sesije)
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    // Funkcija za odjavu korisnika
    const logout = () => {
        setCurrentUser(null);
        // Ukloni korisničke podatke iz localStorage-a
        localStorage.removeItem('currentUser');
    };

    // Vrednost konteksta koju će provajder pružiti
    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
