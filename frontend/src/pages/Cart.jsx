import React from 'react';
import { useCart, useDispatchCart } from '../components/ ContentReducer';
import NavBar from '../components/NavBar';

export default function Cart() {
    const cart = useCart();
    const dispatch = useDispatchCart();

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");

        let response = await fetch("http://localhost:3000/api/orderData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_data: cart,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        console.log("Order Response: ", response);

        if (response.ok) {
            dispatch({ type: "DROP" });
        } else {
            const errorData = await response.json();
            console.error("Checkout failed:", errorData);
        }
    };

    const handleUpdateQty = (index, qty) => {
        const item = cart[index];
        const updatedPrice = (item.price / item.qty) * qty;

        dispatch({
            type: 'UPDATE',
            id: item.id,
            size: item.size,
            qty,
            price: updatedPrice,
        });
    };

    const handleRemove = (index) => {
        dispatch({ type: 'REMOVE', index });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-lg">Your cart is empty. Start adding some delicious food! 🍔</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-gray-800 rounded-2xl shadow-lg p-4 relative">
                                <div className="text-xl font-semibold mb-2">{item.name}</div>
                                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                                    <div>Size: <span className="text-white font-medium">{item.size}</span></div>
                                    <div>Price: <span className="text-green-400 font-semibold">₹{item.price.toFixed(2)}</span></div>
                                </div>

                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <label htmlFor={`qty-${index}`} className="text-sm">Qty:</label>
                                    <input
                                        id={`qty-${index}`}
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) => handleUpdateQty(index, parseInt(e.target.value))}
                                        className="w-20 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleUpdateQty(index, item.qty)}
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm rounded-full text-white"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded-full text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="mt-8 p-6 bg-gray-800 rounded-xl text-center shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Total: ₹{totalPrice.toFixed(2)}</h2>
                        <button
                            className="mt-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full"
                            onClick={handleCheckOut}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
