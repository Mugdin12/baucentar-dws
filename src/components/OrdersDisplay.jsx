import React from 'react';

export default function OrdersDisplay({ orders, onUpdateOrderStatus, onArchiveOrder }) { // ✨ Dodan onArchiveOrder prop
    if (orders.length === 0) {
        return (
            <p className="text-center text-gray-600 text-xl">Nema pristiglih narudžbina.</p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-gray-100 rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-800">Narudžbina #{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                            order.status === 'Approved' ? 'bg-green-200 text-green-800' :
                                'bg-red-200 text-red-800'}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-gray-700 mb-2"><strong>Korisnik:</strong> {order.username} (ID: {order.userId})</p>
                    <p className="text-gray-700 mb-2"><strong>Ukupno stavki:</strong> {order.totalItems}</p>
                    <p className="text-gray-700 mb-2"><strong>Ukupna cena:</strong> {order.totalPrice} KM</p>
                    <p className="text-gray-700 mb-4"><strong>Datum:</strong> {new Date(order.orderDate).toLocaleString('hr-HR')}</p>

                    <h4 className="text-lg font-medium text-gray-800 mb-2">Stavke:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                        {order.items.map((item) => (
                            <li key={item.productId}>
                                {item.name} x {item.quantity} ({item.price})
                            </li>
                        ))}
                    </ul>

                    {/* Dugmad za promenu statusa */}
                    <div className="flex justify-end space-x-2 mt-auto"> {/* ✨ mt-auto za guranje na dno */}
                        {order.status === 'Pending' && (
                            <>
                                <button
                                    onClick={() => onUpdateOrderStatus(order.id, 'Approved')}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                                >
                                    Odobri
                                </button>
                                <button
                                    onClick={() => onUpdateOrderStatus(order.id, 'Rejected')}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                >
                                    Odbij
                                </button>
                            </>
                        )}
                        {/*  Dugme za arhiviranje/brisanje */}
                        <button
                            onClick={() => onArchiveOrder(order.id)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                            Arhiviraj
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
