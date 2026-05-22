import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem("userEmail");
            try {
                const response = await fetch("http://localhost:3000/api/myorder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                console.log("Fetched orders:", data);

                if (!Array.isArray(data)) {
                    setOrders([]); // fallback if somehow still not an array
                } else {
                    setOrders(data);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-900 text-white p-4">
                <h1 className="text-3xl font-bold text-center mb-6">📦 My Orders</h1>
                {loading ? (
                    <p className="text-center">Loading your orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-lg">No past orders found. Start ordering now!</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((orderGroup, groupIndex) => (
                            <div key={groupIndex} className="bg-gray-800 p-4 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold text-orange-400 mb-2">
                                    🗓️ Order Date: {orderGroup[0]?.Order_date || "Unknown"}
                                </h2>
                                <ul className="space-y-2">
                                    {orderGroup.slice(1).map((item, index) => (
                                        <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-gray-400">Qty: {item.qty} | Size: {item.size}</div>
                                            </div>
                                            <div className="text-green-400 font-semibold">₹{item.price.toFixed(2)}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
