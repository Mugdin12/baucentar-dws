import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrdersDisplay from '../components/OrdersDisplay';

export default function AdminPanel() {
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const [ordersRes, contactsRes] = await Promise.all([
                    fetch("http://localhost:3001/orders"),
                    fetch("http://localhost:3001/contacts")
                ]);

                if (!ordersRes.ok || !contactsRes.ok) {
                    throw new Error('Greška pri dohvatanju podataka.');
                }

                const ordersData = await ordersRes.json();
                const contactsData = await contactsRes.json();

                setOrders(ordersData);
                setContacts(contactsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser, navigate]);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Greška pri ažuriranju statusa narudžbine: ${response.statusText}`);
            }

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            console.error("Greška pri ažuriranju statusa narudžbine:", err);
            setError(err.message);
        }
    };

    const handleArchiveOrder = async (orderId) => {
        if (window.confirm(`Da li ste sigurni da želite arhivirati (obrisati) narudžbinu #${orderId}? Ova akcija je nepovratna.`)) {
            try {
                const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Greška pri arhiviranju narudžbine: ${response.statusText}`);
                }

                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            } catch (err) {
                console.error("Greška pri arhiviranju narudžbine:", err);
                setError(err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col pt-24 items-center justify-center">
                <p className="text-xl text-gray-700">Učitavanje podataka...</p>
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

                    <OrdersDisplay
                        orders={orders}
                        onUpdateOrderStatus={handleUpdateOrderStatus}
                        onArchiveOrder={handleArchiveOrder}
                    />

                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Poslane Kontakt Poruke</h2>
                        {contacts.length === 0 ? (
                            <p className="text-gray-600">Nema poslanih poruka.</p>
                        ) : (
                            <ul className="space-y-4">
                                {contacts.map((msg) => (
                                    <li key={msg.id} className="border p-4 rounded-lg shadow-sm">
                                        <p><strong>Ime:</strong> {msg.ime}</p>
                                        <p><strong>Email:</strong> {msg.email}</p>
                                        <p><strong>Poruka:</strong> {msg.poruka}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
