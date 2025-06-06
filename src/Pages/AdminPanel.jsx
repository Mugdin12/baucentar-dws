import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrdersDisplay from '../components/OrdersDisplay';

export default function AdminPanel() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3001/orders");
                if (!response.ok) {
                    throw new Error(`Greška pri dohvatanju narudžbina: ${response.statusText}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentUser, navigate]);

    // ✨ Nova funkcija za ažuriranje statusa narudžbine
    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'PATCH', // Koristimo PATCH za delimično ažuriranje resursa
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Greška pri ažuriranju statusa narudžbine: ${response.statusText}`);
            }

            // Ažuriraj stanje narudžbina u Reactu kako bi se UI odmah osvežio
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            console.log(`Status narudžbine #${orderId} ažuriran na: ${newStatus}`);

        } catch (err) {
            console.error("Greška pri ažuriranju statusa narudžbine:", err);
            setError(err.message); // Prikazati grešku korisniku ako se desi
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24 items-center justify-center">
                <p className="text-xl text-gray-700">Učitavanje narudžbina...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24 items-center justify-center">
                <p className="text-xl text-red-600">Greška: {error}</p>
            </div>
        );
    }

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24 items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Pristup Odbijen!</h1>
                <p className="text-gray-700 text-lg">Nemate dozvolu za pristup ovoj stranici.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar />
            <main className="flex-grow w-full px-6 py-12">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Admin Panel - Narudžbine</h1>

                    <OrdersDisplay orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} /> {/* ✨ Prosleđena funkcija */}
                </div>
            </main>
            <Footer />
        </div>
    );
}
