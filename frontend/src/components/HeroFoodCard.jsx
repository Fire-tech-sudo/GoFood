import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
// import { useDispatchCart } from './ ContentReducer';
import { useDispatchCart, useCart } from './ ContentReducer';

const HeroCard = ({ foodItem, options }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(Object.keys(options)[0]);

    const cart = useCart();
    const dispatch = useDispatchCart();

    const existingItem = cart.find(
        item => item.id === foodItem._id && item.size === size
    );

    const handleAddOrUpdate = () => {
        const price = options[size] * quantity;

        if (existingItem) {
            dispatch({
                type: "UPDATE",
                id: foodItem._id,
                name: foodItem.name,
                price,
                description: foodItem.description,
                qty: quantity,
                size,
            });
        } else {
            dispatch({
                type: "ADD",
                id: foodItem._id,
                name: foodItem.name,
                price,
                description: foodItem.description,
                qty: quantity,
                size,
            });
        }
    };


    return (
        <div className="max-w-sm mt-2 bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition-shadow duration-300">
            <img
                src={foodItem.img}
                alt="Delicious"
                className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold text-orange-400 mb-2">{foodItem.name}</h2>
                <p className="text-sm text-gray-300 mb-3">{foodItem.description}</p>
                <p className="text-lg font-bold mb-4">₹{options[size] * quantity}</p>

                <div className="flex items-center justify-between gap-4 mb-4">
                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 bg-gray-800 rounded-full text-orange-400">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-2 bg-gray-800 rounded-full text-orange-400">+</button>
                    </div>

                    {/* Plate Size */}
                    <div className="w-1/3">
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full px-3 py-1 rounded-xl bg-gray-800 text-white border border-gray-700"
                        >
                            {Object.keys(options).map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button onClick={handleAddOrUpdate} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full">
                    <FaShoppingCart /> {existingItem ? 'Update Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};


export default HeroCard;
